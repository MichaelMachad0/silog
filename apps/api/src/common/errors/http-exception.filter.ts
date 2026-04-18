import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { ApiError, type ApiErrorBody } from './api-error';
import { getRequestContext } from '../http/request-context.middleware';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const requestId = getRequestContext(req)?.requestId;

    const { status, body } = this.toResponse(exception, requestId);
    res.status(status).json(body);
  }

  private toResponse(exception: unknown, requestId?: string): {
    status: number;
    body: ApiErrorBody;
  } {
    if (exception instanceof ApiError) {
      return {
        status: exception.status,
        body: {
          code: exception.code,
          message: exception.message,
          requestId,
          details: exception.details
        }
      };
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();
      return {
        status,
        body: {
          code: 'HTTP_EXCEPTION',
          message: typeof response === 'string' ? response : exception.message,
          requestId,
          details: typeof response === 'object' ? response : undefined
        }
      };
    }

    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      body: {
        code: 'INTERNAL_ERROR',
        message: 'Erro inesperado',
        requestId
      }
    };
  }
}


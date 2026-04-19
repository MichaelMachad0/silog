"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const api_error_1 = require("./api-error");
const request_context_middleware_1 = require("../http/request-context.middleware");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();
        const requestId = (0, request_context_middleware_1.getRequestContext)(req)?.requestId;
        const { status, body } = this.toResponse(exception, requestId);
        res.status(status).json(body);
    }
    toResponse(exception, requestId) {
        if (exception instanceof api_error_1.ApiError) {
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
        if (exception instanceof common_1.HttpException) {
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
            status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
                code: 'INTERNAL_ERROR',
                message: 'Erro inesperado',
                requestId
            }
        };
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)()
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map
import type { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import type { RequestContext } from './request-context';

declare global {
  // eslint-disable-next-line no-var
  var __silogRequestContext: WeakMap<Request, RequestContext> | undefined;
}

function getStore() {
  if (!globalThis.__silogRequestContext) {
    globalThis.__silogRequestContext = new WeakMap();
  }
  return globalThis.__silogRequestContext;
}

export function requestContextMiddleware() {
  const store = getStore();
  return (req: Request, res: Response, next: NextFunction) => {
    const incoming = req.header('x-request-id');
    const requestId =
      typeof incoming === 'string' && incoming.trim() ? incoming.trim() : randomUUID();

    store.set(req, { requestId });
    res.setHeader('x-request-id', requestId);
    next();
  };
}

export function getRequestContext(req: Request): RequestContext | undefined {
  return getStore().get(req);
}


"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestContextMiddleware = requestContextMiddleware;
exports.getRequestContext = getRequestContext;
const crypto_1 = require("crypto");
function getStore() {
    if (!globalThis.__silogRequestContext) {
        globalThis.__silogRequestContext = new WeakMap();
    }
    return globalThis.__silogRequestContext;
}
function requestContextMiddleware() {
    const store = getStore();
    return (req, res, next) => {
        const incoming = req.header('x-request-id');
        const requestId = typeof incoming === 'string' && incoming.trim() ? incoming.trim() : (0, crypto_1.randomUUID)();
        store.set(req, { requestId });
        res.setHeader('x-request-id', requestId);
        next();
    };
}
function getRequestContext(req) {
    return getStore().get(req);
}
//# sourceMappingURL=request-context.middleware.js.map
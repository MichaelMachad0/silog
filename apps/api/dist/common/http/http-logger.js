"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHttpLogger = createHttpLogger;
const pino_http_1 = __importDefault(require("pino-http"));
function createHttpLogger() {
    const level = process.env.LOG_LEVEL ?? 'info';
    return (0, pino_http_1.default)({
        level,
        redact: ['req.headers.authorization']
    });
}
//# sourceMappingURL=http-logger.js.map
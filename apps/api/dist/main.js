"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/errors/http-exception.filter");
const request_context_middleware_1 = require("./common/http/request-context.middleware");
const http_logger_1 = require("./common/http/http-logger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true
    });
    app.use((0, http_logger_1.createHttpLogger)());
    app.use((0, request_context_middleware_1.requestContextMiddleware)());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    const port = Number(process.env.PORT ?? 3001);
    await app.listen(port);
}
bootstrap().catch((err) => {
    // fallback: se algo falhar antes do logger do Nest
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map
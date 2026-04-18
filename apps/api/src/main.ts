import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/errors/http-exception.filter';
import { requestContextMiddleware } from './common/http/request-context.middleware';
import { createHttpLogger } from './common/http/http-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });

  app.use(createHttpLogger());
  app.use(requestContextMiddleware());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);
}

bootstrap().catch((err) => {
  // fallback: se algo falhar antes do logger do Nest
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});


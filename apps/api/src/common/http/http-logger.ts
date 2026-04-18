import pinoHttp from 'pino-http';

export function createHttpLogger() {
  const level = process.env.LOG_LEVEL ?? 'info';
  return pinoHttp({
    level,
    redact: ['req.headers.authorization']
  });
}


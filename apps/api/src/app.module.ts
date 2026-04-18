import { Module } from '@nestjs/common';
import { AuditModule } from './common/audit/audit.module';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [HealthModule, PrismaModule, AuditModule]
})
export class AppModule {}


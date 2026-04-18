import { Module } from '@nestjs/common';
import { AuditModule } from './common/audit/audit.module';
import { HealthModule } from './health/health.module';
import { MotoristasModule } from './modules/motoristas/motoristas.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [HealthModule, PrismaModule, AuditModule, MotoristasModule]
})
export class AppModule {}


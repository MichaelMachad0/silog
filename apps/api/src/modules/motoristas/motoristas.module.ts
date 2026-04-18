import { Module } from '@nestjs/common';
import { MotoristasController } from './motoristas.controller';
import { MotoristasRepository } from './motoristas.repository';
import { MotoristasService } from './motoristas.service';

@Module({
  controllers: [MotoristasController],
  providers: [MotoristasService, MotoristasRepository]
})
export class MotoristasModule {}

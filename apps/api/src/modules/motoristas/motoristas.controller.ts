import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { getRequestContext } from '../../common/http/request-context.middleware';
import type { CreateMotoristaDto } from './dto/create-motorista.dto';
import { MotoristasService } from './motoristas.service';

@Controller('motoristas')
export class MotoristasController {
  constructor(private readonly motoristasService: MotoristasService) {}

  @Post()
  create(@Body() dto: CreateMotoristaDto, @Req() req: Request) {
    const requestId = getRequestContext(req)?.requestId;
    return this.motoristasService.create(dto, { requestId });
  }

  @Get()
  findAll() {
    return this.motoristasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.motoristasService.findOne(id);
  }
}

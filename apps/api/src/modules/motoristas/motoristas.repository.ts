import { Injectable } from '@nestjs/common';
import type { Motorista, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MotoristasRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.MotoristaCreateInput): Promise<Motorista> {
    return this.prisma.motorista.create({ data });
  }

  findAll(): Promise<Motorista[]> {
    return this.prisma.motorista.findMany({
      orderBy: { nome: 'asc' }
    });
  }

  findById(id: string): Promise<Motorista | null> {
    return this.prisma.motorista.findUnique({ where: { id } });
  }
}

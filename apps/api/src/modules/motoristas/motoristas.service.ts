import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { Motorista } from '@prisma/client';
import { AuditService } from '../../common/audit/audit.service';
import { ApiError } from '../../common/errors/api-error';
import type { CreateMotoristaDto } from './dto/create-motorista.dto';
import { MotoristasRepository } from './motoristas.repository';

@Injectable()
export class MotoristasService {
  constructor(
    private readonly motoristasRepository: MotoristasRepository,
    private readonly auditService: AuditService
  ) {}

  async create(
    dto: CreateMotoristaDto,
    opts?: { requestId?: string }
  ): Promise<Motorista> {
    try {
      const data: Prisma.MotoristaCreateInput = {
        nome: dto.nome.trim(),
        cpf: dto.cpf,
        telefone: dto.telefone?.trim() ?? undefined,
        dataNascimento: dto.dataNascimento ? new Date(dto.dataNascimento) : undefined,
        cnhNumero: dto.cnhNumero?.trim() ?? undefined,
        cnhCategoria: dto.cnhCategoria?.trim() ?? undefined,
        cnhValidade: dto.cnhValidade ? new Date(dto.cnhValidade) : undefined,
        ear: dto.ear ?? false,
        rntrc: dto.rntrc?.trim() ?? undefined,
        rntrcCategoria: dto.rntrcCategoria?.trim() ?? undefined,
        status: dto.status?.trim() || undefined,
        observacoes: dto.observacoes?.trim() ?? undefined
      };

      const motorista = await this.motoristasRepository.create(data);

      await this.auditService.record({
        name: 'entity.created',
        at: new Date().toISOString(),
        requestId: opts?.requestId,
        resource: { type: 'motorista', id: motorista.id },
        metadata: { cpf: motorista.cpf }
      });

      return motorista;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ApiError({
          code: 'MOTORISTA_CPF_DUPLICADO',
          message: 'Já existe um motorista cadastrado com este CPF.',
          status: 409,
          details: { target: e.meta?.target }
        });
      }
      throw e;
    }
  }

  async findAll(): Promise<Motorista[]> {
    return this.motoristasRepository.findAll();
  }

  async findOne(id: string): Promise<Motorista> {
    const motorista = await this.motoristasRepository.findById(id);
    if (!motorista) {
      throw new ApiError({
        code: 'MOTORISTA_NAO_ENCONTRADO',
        message: 'Motorista não encontrado.',
        status: 404
      });
    }
    return motorista;
  }
}

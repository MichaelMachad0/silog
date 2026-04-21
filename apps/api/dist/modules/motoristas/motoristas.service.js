"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MotoristasService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const audit_service_1 = require("../../common/audit/audit.service");
const api_error_1 = require("../../common/errors/api-error");
const motoristas_repository_1 = require("./motoristas.repository");
let MotoristasService = class MotoristasService {
    motoristasRepository;
    auditService;
    constructor(motoristasRepository, auditService) {
        this.motoristasRepository = motoristasRepository;
        this.auditService = auditService;
    }
    async create(dto, opts) {
        try {
            const data = {
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
        }
        catch (e) {
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
                throw new api_error_1.ApiError({
                    code: 'MOTORISTA_CPF_DUPLICADO',
                    message: 'Já existe um motorista cadastrado com este CPF.',
                    status: 409,
                    details: { target: e.meta?.target }
                });
            }
            throw e;
        }
    }
    async findAll() {
        return this.motoristasRepository.findAll();
    }
    async findOne(id) {
        const motorista = await this.motoristasRepository.findById(id);
        if (!motorista) {
            throw new api_error_1.ApiError({
                code: 'MOTORISTA_NAO_ENCONTRADO',
                message: 'Motorista não encontrado.',
                status: 404
            });
        }
        return motorista;
    }
};
exports.MotoristasService = MotoristasService;
exports.MotoristasService = MotoristasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [motoristas_repository_1.MotoristasRepository,
        audit_service_1.AuditService])
], MotoristasService);
//# sourceMappingURL=motoristas.service.js.map
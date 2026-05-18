import { podeTransicionar } from '@/lib/carga-status'
import { eventoCargaCriada } from '@/lib/eventos-operacionais'
import { agendarNotificacaoMotorista } from '@/lib/notificar-motorista'
import { prisma } from '@/lib/prisma'
import {
  criarViagemParaCarga,
  sincronizarViagemComStatus,
  viagemInclude,
} from '@/lib/viagem-service'
import { Prisma, StatusCarga } from '@prisma/client'

export const cargaInclude = {
  motorista: { select: { id: true, nome: true, telefone: true } },
  veiculo: { select: { id: true, placa: true, tipo: true } },
  frete: true,
  viagem: { include: viagemInclude },
  eventos: { orderBy: { createdAt: 'desc' as const }, take: 5 },
  mensagens: { orderBy: { createdAt: 'desc' as const }, take: 1 },
} satisfies Prisma.CargaInclude

export async function criarCargaCompleta(
  data: {
    origem: string
    destino: string
    peso?: number | null
    valorNota?: number | null
    motoristaId: string
    veiculoId: string
  },
  criadoPorId?: string
) {
  const carga = await prisma.carga.create({
    data: {
      origem: data.origem,
      destino: data.destino,
      peso: data.peso ?? null,
      valorNota: data.valorNota ?? null,
      motoristaId: data.motoristaId,
      veiculoId: data.veiculoId,
    },
    include: { motorista: true },
  })

  const viagem = await criarViagemParaCarga(
    carga.id,
    carga.motoristaId,
    carga.veiculoId
  )

  await prisma.cargaEvento.create({
    data: {
      cargaId: carga.id,
      statusAnterior: null,
      statusNovo: StatusCarga.CRIADA,
      observacao: 'Carga cadastrada',
    },
  })

  await eventoCargaCriada(
    carga.id,
    viagem.id,
    carga.motorista.nome,
    carga.origem,
    carga.destino,
    criadoPorId
  )

  return prisma.carga.findUnique({
    where: { id: carga.id },
    include: cargaInclude,
  })
}

export async function registrarEventoStatus(
  cargaId: string,
  statusAnterior: StatusCarga | null,
  statusNovo: StatusCarga,
  observacao?: string,
  criadoPorId?: string
) {
  const agora = new Date()

  const resultado = await prisma.$transaction(async (tx) => {
    const carga = await tx.carga.update({
      where: { id: cargaId },
      data: {
        status: statusNovo,
        ...(statusNovo === 'EM_TRANSITO' && { rastreadoEm: agora }),
        ...(statusNovo === 'ENTREGUE' && { entregueEm: agora }),
      },
      include: cargaInclude,
    })

    const evento = await tx.cargaEvento.create({
      data: {
        cargaId,
        statusAnterior,
        statusNovo,
        observacao,
      },
    })

    return { carga, eventoId: evento.id }
  })

  await sincronizarViagemComStatus(cargaId, statusNovo, criadoPorId)

  agendarNotificacaoMotorista(
    resultado.carga,
    statusNovo,
    resultado.eventoId
  )

  return prisma.carga.findUnique({
    where: { id: cargaId },
    include: cargaInclude,
  })
}

export async function transicionarStatus(
  cargaId: string,
  statusNovo: StatusCarga,
  observacao?: string,
  criadoPorId?: string
) {
  const carga = await prisma.carga.findUnique({ where: { id: cargaId } })

  if (!carga) {
    return { ok: false as const, error: 'Carga não encontrada', status: 404 }
  }

  if (!podeTransicionar(carga.status, statusNovo)) {
    return {
      ok: false as const,
      error: `Transição inválida: ${carga.status} → ${statusNovo}`,
      status: 400,
    }
  }

  const atualizada = await registrarEventoStatus(
    cargaId,
    carga.status,
    statusNovo,
    observacao,
    criadoPorId
  )

  return { ok: true as const, carga: atualizada }
}

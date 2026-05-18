import { eventoDeStatus } from '@/lib/eventos-operacionais'
import { prisma } from '@/lib/prisma'
import { Prisma, StatusCarga, StatusViagem } from '@prisma/client'

export const viagemInclude = {
  carga: {
    select: {
      id: true,
      origem: true,
      destino: true,
      status: true,
    },
  },
  motorista: { select: { id: true, nome: true, telefone: true } },
  veiculo: { select: { id: true, placa: true, tipo: true } },
} satisfies Prisma.ViagemInclude

const STATUS_VIAGEM_POR_CARGA: Partial<Record<StatusCarga, StatusViagem>> = {
  EM_TRANSITO: 'EM_ANDAMENTO',
  ENTREGUE: 'CONCLUIDA',
  CANCELADA: 'CANCELADA',
}

export async function criarViagemParaCarga(
  cargaId: string,
  motoristaId: string,
  veiculoId: string
) {
  return prisma.viagem.create({
    data: { cargaId, motoristaId, veiculoId },
    include: viagemInclude,
  })
}

export async function sincronizarViagemComStatus(
  cargaId: string,
  statusNovo: StatusCarga,
  criadoPorId?: string
) {
  const carga = await prisma.carga.findUnique({
    where: { id: cargaId },
    include: { viagem: true },
  })
  if (!carga) return null

  const statusViagem = STATUS_VIAGEM_POR_CARGA[statusNovo]
  const agora = new Date()

  let viagem = carga.viagem

  if (viagem && statusViagem) {
    viagem = await prisma.viagem.update({
      where: { id: viagem.id },
      data: {
        status: statusViagem,
        ...(statusNovo === 'EM_TRANSITO' && { iniciadaEm: agora }),
        ...(statusNovo === 'ENTREGUE' && { concluidaEm: agora }),
      },
      include: viagemInclude,
    })
  }

  await eventoDeStatus(
    carga.id,
    viagem?.id ?? null,
    statusNovo,
    carga.origem,
    carga.destino,
    criadoPorId
  )

  return viagem
}

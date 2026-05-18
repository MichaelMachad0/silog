import { prisma } from '@/lib/prisma'
import { STATUS_LABEL } from '@/lib/carga-status'
import {
  Prisma,
  StatusCarga,
  StatusMensagem,
  TipoEventoOperacional,
} from '@prisma/client'

type RegistrarEventoInput = {
  tipo: TipoEventoOperacional
  titulo: string
  descricao?: string
  cargaId?: string
  viagemId?: string
  mensagemId?: string
  criadoPorId?: string
  metadata?: Prisma.InputJsonValue
}

export async function registrarEventoOperacional(input: RegistrarEventoInput) {
  return prisma.eventoOperacional.create({ data: input })
}

export function tituloStatusCarga(
  statusNovo: StatusCarga,
  origem: string,
  destino: string
): { tipo: TipoEventoOperacional; titulo: string; descricao: string } {
  switch (statusNovo) {
    case 'LIBERADA':
      return {
        tipo: 'CARGA_LIBERADA',
        titulo: 'Carga liberada',
        descricao: `${origem} → ${destino} liberada para operação`,
      }
    case 'EM_TRANSITO':
      return {
        tipo: 'VIAGEM_INICIADA',
        titulo: 'Viagem iniciada',
        descricao: `Saída registrada: ${origem} → ${destino}`,
      }
    case 'ENTREGUE':
      return {
        tipo: 'CHEGADA_CLIENTE',
        titulo: 'Chegada no cliente',
        descricao: `Entrega concluída em ${destino}`,
      }
    case 'CANCELADA':
      return {
        tipo: 'CARGA_CANCELADA',
        titulo: 'Carga cancelada',
        descricao: `Operação cancelada: ${origem} → ${destino}`,
      }
    default:
      return {
        tipo: 'STATUS_ALTERADO',
        titulo: `Status: ${STATUS_LABEL[statusNovo]}`,
        descricao: `${origem} → ${destino}`,
      }
  }
}

export async function eventoCargaCriada(
  cargaId: string,
  viagemId: string,
  motoristaNome: string,
  origem: string,
  destino: string,
  criadoPorId?: string
) {
  await registrarEventoOperacional({
    tipo: 'CARGA_CRIADA',
    titulo: 'Carga criada',
    descricao: `${origem} → ${destino}`,
    cargaId,
    viagemId,
    criadoPorId,
  })

  await registrarEventoOperacional({
    tipo: 'MOTORISTA_VINCULADO',
    titulo: 'Motorista vinculado',
    descricao: motoristaNome,
    cargaId,
    viagemId,
    criadoPorId,
  })
}

export async function eventoDeStatus(
  cargaId: string,
  viagemId: string | null,
  statusNovo: StatusCarga,
  origem: string,
  destino: string,
  criadoPorId?: string
) {
  const { tipo, titulo, descricao } = tituloStatusCarga(
    statusNovo,
    origem,
    destino
  )

  await registrarEventoOperacional({
    tipo,
    titulo,
    descricao,
    cargaId,
    viagemId: viagemId ?? undefined,
    criadoPorId,
    metadata: { statusNovo },
  })

  if (statusNovo === 'ENTREGUE' && viagemId) {
    await registrarEventoOperacional({
      tipo: 'VIAGEM_CONCLUIDA',
      titulo: 'Viagem concluída',
      descricao: `Rota finalizada: ${origem} → ${destino}`,
      cargaId,
      viagemId,
      criadoPorId,
    })
  }
}

export async function eventoMensagem(
  cargaId: string,
  mensagemId: string,
  status: StatusMensagem,
  viagemId?: string | null
) {
  const enviada = status === 'ENVIADA'
  await registrarEventoOperacional({
    tipo: enviada ? 'MENSAGEM_ENVIADA' : 'MENSAGEM_FALHA',
    titulo: enviada ? 'Mensagem WhatsApp enviada' : 'Falha no WhatsApp',
    cargaId,
    viagemId: viagemId ?? undefined,
    mensagemId,
  })
}

export const timelineInclude = {
  carga: {
    select: {
      id: true,
      origem: true,
      destino: true,
      motorista: { select: { nome: true } },
    },
  },
  viagem: { select: { id: true, status: true } },
  criadoPor: { select: { id: true, nome: true, perfil: true } },
} satisfies Prisma.EventoOperacionalInclude

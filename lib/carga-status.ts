import { StatusCarga } from '@prisma/client'

export const STATUS_LABEL: Record<StatusCarga, string> = {
  CRIADA: 'Criada',
  LIBERADA: 'Liberada',
  EM_TRANSITO: 'Em trânsito',
  ENTREGUE: 'Entregue',
  CANCELADA: 'Cancelada',
}

export const TRANSICOES_VALIDAS: Record<StatusCarga, StatusCarga[]> = {
  CRIADA: ['LIBERADA', 'CANCELADA'],
  LIBERADA: ['EM_TRANSITO', 'CANCELADA'],
  EM_TRANSITO: ['ENTREGUE', 'CANCELADA'],
  ENTREGUE: [],
  CANCELADA: [],
}

export function podeTransicionar(
  atual: StatusCarga,
  proximo: StatusCarga
): boolean {
  return TRANSICOES_VALIDAS[atual].includes(proximo)
}

export function isStatusCarga(value: unknown): value is StatusCarga {
  return (
    typeof value === 'string' &&
    Object.values(StatusCarga).includes(value as StatusCarga)
  )
}

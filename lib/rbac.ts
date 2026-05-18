import { PerfilUsuario } from '@prisma/client'

export type Recurso =
  | 'motoristas'
  | 'cargas'
  | 'viagens'
  | 'eventos'
  | 'mensagens'
  | 'timeline'
  | 'usuarios'

const PERMISSOES: Record<PerfilUsuario, Recurso[] | '*'> = {
  ADMIN: '*',
  OPERADOR: ['motoristas', 'cargas', 'viagens', 'eventos', 'mensagens', 'timeline'],
  MOTORISTA: ['cargas', 'viagens', 'eventos', 'timeline'],
}

export function podeAcessar(perfil: PerfilUsuario, recurso: Recurso): boolean {
  const perm = PERMISSOES[perfil]
  if (perm === '*') return true
  return perm.includes(recurso)
}

export function podeGerenciarUsuarios(perfil: PerfilUsuario): boolean {
  return perfil === 'ADMIN'
}

import { auth } from '@/auth'
import { podeAcessar, Recurso } from '@/lib/rbac'
import { PerfilUsuario } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function exigirSessao(recurso?: Recurso) {
  const session = await auth()

  if (!session?.user) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: 'Não autenticado' }, { status: 401 }),
    }
  }

  if (recurso && !podeAcessar(session.user.perfil, recurso)) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: 'Sem permissão' }, { status: 403 }),
    }
  }

  return {
    ok: true as const,
    session: session.user,
  }
}

export function filtroMotorista(motoristaIdSessao: string | null | undefined) {
  return motoristaIdSessao ? { motoristaId: motoristaIdSessao } : {}
}

export function isMotorista(perfil: PerfilUsuario) {
  return perfil === 'MOTORISTA'
}

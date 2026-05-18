import { exigirSessao, isMotorista } from '@/lib/api-auth'
import { prisma } from '@/lib/prisma'
import { viagemInclude } from '@/lib/viagem-service'
import { NextResponse } from 'next/server'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: RouteContext) {
  const auth = await exigirSessao('viagens')
  if (!auth.ok) return auth.response

  const { id } = await params

  const viagem = await prisma.viagem.findUnique({
    where: { id },
    include: {
      ...viagemInclude,
      eventosOps: { orderBy: { createdAt: 'desc' }, take: 20 },
    },
  })

  if (!viagem) {
    return NextResponse.json({ error: 'Viagem não encontrada' }, { status: 404 })
  }

  if (
    isMotorista(auth.session.perfil) &&
    viagem.motoristaId !== auth.session.motoristaId
  ) {
    return NextResponse.json({ error: 'Sem permissão' }, { status: 403 })
  }

  return NextResponse.json(viagem)
}

import { exigirSessao, filtroMotorista, isMotorista } from '@/lib/api-auth'
import { prisma } from '@/lib/prisma'
import { viagemInclude } from '@/lib/viagem-service'
import { NextResponse } from 'next/server'

export async function GET() {
  const auth = await exigirSessao('viagens')
  if (!auth.ok) return auth.response

  const viagens = await prisma.viagem.findMany({
    where: isMotorista(auth.session.perfil)
      ? filtroMotorista(auth.session.motoristaId)
      : {},
    include: viagemInclude,
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(viagens)
}

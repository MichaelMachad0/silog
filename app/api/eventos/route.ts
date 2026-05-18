import { exigirSessao, isMotorista } from '@/lib/api-auth'
import { timelineInclude } from '@/lib/eventos-operacionais'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const auth = await exigirSessao('eventos')
  if (!auth.ok) return auth.response

  const { searchParams } = new URL(req.url)
  const cargaId = searchParams.get('cargaId')
  const viagemId = searchParams.get('viagemId')

  const eventos = await prisma.eventoOperacional.findMany({
    where: {
      ...(cargaId ? { cargaId } : {}),
      ...(viagemId ? { viagemId } : {}),
      ...(isMotorista(auth.session.perfil)
        ? { carga: { motoristaId: auth.session.motoristaId! } }
        : {}),
    },
    include: timelineInclude,
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  return NextResponse.json(eventos)
}

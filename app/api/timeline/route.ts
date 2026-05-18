import { exigirSessao, isMotorista } from '@/lib/api-auth'
import { timelineInclude } from '@/lib/eventos-operacionais'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const auth = await exigirSessao('timeline')
  if (!auth.ok) return auth.response

  const { searchParams } = new URL(req.url)
  const cargaId = searchParams.get('cargaId')
  const limite = Math.min(Number(searchParams.get('limite') ?? 50), 100)

  const whereMotorista = isMotorista(auth.session.perfil)
    ? {
        carga: { motoristaId: auth.session.motoristaId! },
      }
    : {}

  const eventos = await prisma.eventoOperacional.findMany({
    where: {
      ...whereMotorista,
      ...(cargaId ? { cargaId } : {}),
    },
    include: timelineInclude,
    orderBy: { createdAt: 'desc' },
    take: limite,
  })

  return NextResponse.json(eventos)
}

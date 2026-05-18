import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: RouteContext) {
  const { id } = await params

  const carga = await prisma.carga.findUnique({
    where: { id },
    select: { id: true },
  })

  if (!carga) {
    return NextResponse.json({ error: 'Carga não encontrada' }, { status: 404 })
  }

  const eventos = await prisma.cargaEvento.findMany({
    where: { cargaId: id },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(eventos)
}

import { cargaInclude } from '@/lib/carga-service'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: RouteContext) {
  const { id } = await params

  const carga = await prisma.carga.findUnique({
    where: { id },
    include: {
      ...cargaInclude,
      eventos: { orderBy: { createdAt: 'desc' } },
    },
  })

  if (!carga) {
    return NextResponse.json({ error: 'Carga não encontrada' }, { status: 404 })
  }

  return NextResponse.json(carga)
}

export async function PUT(req: Request, { params }: RouteContext) {
  const { id } = await params
  const body = await req.json()

  const carga = await prisma.carga.update({
    where: { id },
    data: {
      origem: body.origem,
      destino: body.destino,
      peso: body.peso,
      valorNota: body.valorNota,
      motoristaId: body.motoristaId,
      veiculoId: body.veiculoId,
    },
    include: cargaInclude,
  })

  return NextResponse.json(carga)
}

export async function DELETE(_req: Request, { params }: RouteContext) {
  const { id } = await params

  await prisma.carga.delete({ where: { id } })

  return NextResponse.json({ message: 'Carga removida' })
}

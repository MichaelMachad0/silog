import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: RouteContext) {
  const { id } = await params

  const motorista = await prisma.motorista.findUnique({
    where: { id },
  })

  return NextResponse.json(motorista)
}

export async function PUT(req: Request, { params }: RouteContext) {
  const { id } = await params
  const body = await req.json()

  const motorista = await prisma.motorista.update({
    where: { id },
    data: body,
  })

  return NextResponse.json(motorista)
}

export async function DELETE(_req: Request, { params }: RouteContext) {
  const { id } = await params

  await prisma.motorista.delete({
    where: { id },
  })

  return NextResponse.json({ message: 'Motorista deletado' })
}

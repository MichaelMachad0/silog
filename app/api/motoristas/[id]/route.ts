import { exigirSessao, isMotorista } from '@/lib/api-auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: RouteContext) {
  const auth = await exigirSessao('motoristas')
  if (!auth.ok) return auth.response

  const { id } = await params

  if (isMotorista(auth.session.perfil) && id !== auth.session.motoristaId) {
    return NextResponse.json({ error: 'Sem permissão' }, { status: 403 })
  }

  const motorista = await prisma.motorista.findUnique({
    where: { id },
    include: { veiculos: true },
  })

  if (!motorista) {
    return NextResponse.json({ error: 'Não encontrado' }, { status: 404 })
  }

  return NextResponse.json(motorista)
}

export async function PUT(req: Request, { params }: RouteContext) {
  const auth = await exigirSessao('motoristas')
  if (!auth.ok) return auth.response

  const { id } = await params

  if (isMotorista(auth.session.perfil)) {
    return NextResponse.json({ error: 'Sem permissão' }, { status: 403 })
  }

  const body = await req.json()

  const motorista = await prisma.motorista.update({
    where: { id },
    data: {
      nome: body.nome,
      telefone: body.telefone,
      cnh: body.cnh,
      status: body.status,
    },
  })

  return NextResponse.json(motorista)
}

export async function DELETE(_req: Request, { params }: RouteContext) {
  const auth = await exigirSessao('motoristas')
  if (!auth.ok) return auth.response

  if (auth.session.perfil !== 'ADMIN') {
    return NextResponse.json({ error: 'Somente admin' }, { status: 403 })
  }

  const { id } = await params
  await prisma.motorista.delete({ where: { id } })

  return NextResponse.json({ message: 'Motorista removido' })
}

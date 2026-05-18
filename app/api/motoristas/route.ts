import { exigirSessao, isMotorista } from '@/lib/api-auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const auth = await exigirSessao('motoristas')
  if (!auth.ok) return auth.response

  const motoristas = await prisma.motorista.findMany({
    where: isMotorista(auth.session.perfil)
      ? { id: auth.session.motoristaId! }
      : {},
    include: { veiculos: true, usuario: { select: { email: true, perfil: true } } },
    orderBy: { nome: 'asc' },
  })

  return NextResponse.json(motoristas)
}

export async function POST(req: Request) {
  const auth = await exigirSessao('motoristas')
  if (!auth.ok) return auth.response

  if (isMotorista(auth.session.perfil)) {
    return NextResponse.json({ error: 'Sem permissão' }, { status: 403 })
  }

  const body = await req.json()

  if (!body.nome || !body.cpf) {
    return NextResponse.json(
      { error: 'nome e cpf são obrigatórios' },
      { status: 400 }
    )
  }

  const motorista = await prisma.motorista.create({
    data: {
      nome: body.nome,
      cpf: body.cpf,
      telefone: body.telefone,
      cnh: body.cnh,
    },
  })

  return NextResponse.json(motorista, { status: 201 })
}

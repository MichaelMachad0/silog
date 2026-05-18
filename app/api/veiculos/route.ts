import { exigirSessao, isMotorista } from '@/lib/api-auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const auth = await exigirSessao('motoristas')
  if (!auth.ok) return auth.response

  const veiculos = await prisma.veiculo.findMany({
    where: isMotorista(auth.session.perfil)
      ? { motoristaId: auth.session.motoristaId! }
      : {},
    include: { motorista: { select: { id: true, nome: true } } },
    orderBy: { placa: 'asc' },
  })

  return NextResponse.json(veiculos)
}

export async function POST(req: Request) {
  const auth = await exigirSessao('motoristas')
  if (!auth.ok) return auth.response

  if (isMotorista(auth.session.perfil)) {
    return NextResponse.json({ error: 'Sem permissão' }, { status: 403 })
  }

  const body = await req.json()

  if (!body.placa || !body.tipo || !body.motoristaId) {
    return NextResponse.json(
      { error: 'placa, tipo e motoristaId são obrigatórios' },
      { status: 400 }
    )
  }

  const veiculo = await prisma.veiculo.create({
    data: {
      placa: body.placa,
      tipo: body.tipo,
      marca: body.marca,
      modelo: body.modelo,
      ano: body.ano,
      motoristaId: body.motoristaId,
    },
  })

  return NextResponse.json(veiculo, { status: 201 })
}

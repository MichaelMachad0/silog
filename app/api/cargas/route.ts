import { exigirSessao, filtroMotorista, isMotorista } from '@/lib/api-auth'
import { cargaInclude, criarCargaCompleta } from '@/lib/carga-service'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const auth = await exigirSessao('cargas')
  if (!auth.ok) return auth.response

  const cargas = await prisma.carga.findMany({
    where: isMotorista(auth.session.perfil)
      ? filtroMotorista(auth.session.motoristaId)
      : {},
    include: cargaInclude,
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(cargas)
}

export async function POST(req: Request) {
  const auth = await exigirSessao('cargas')
  if (!auth.ok) return auth.response

  if (isMotorista(auth.session.perfil)) {
    return NextResponse.json({ error: 'Sem permissão' }, { status: 403 })
  }

  const body = await req.json()

  if (!body.origem || !body.destino || !body.motoristaId || !body.veiculoId) {
    return NextResponse.json(
      { error: 'origem, destino, motoristaId e veiculoId são obrigatórios' },
      { status: 400 }
    )
  }

  const carga = await criarCargaCompleta(
    {
      origem: body.origem,
      destino: body.destino,
      peso: body.peso,
      valorNota: body.valorNota,
      motoristaId: body.motoristaId,
      veiculoId: body.veiculoId,
    },
    auth.session.id
  )

  return NextResponse.json(carga, { status: 201 })
}

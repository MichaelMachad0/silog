import { exigirSessao } from '@/lib/api-auth'
import { transicionarStatus } from '@/lib/carga-service'
import { isStatusCarga } from '@/lib/carga-status'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

type RouteContext = { params: Promise<{ id: string }> }

export async function PATCH(req: Request, { params }: RouteContext) {
  const auth = await exigirSessao('cargas')
  if (!auth.ok) return auth.response

  const { id } = await params
  const body = await req.json()

  if (!isStatusCarga(body.status)) {
    return NextResponse.json({ error: 'status inválido' }, { status: 400 })
  }

  const carga = await prisma.carga.findUnique({ where: { id } })
  if (!carga) {
    return NextResponse.json({ error: 'Carga não encontrada' }, { status: 404 })
  }

  if (
    auth.session.perfil === 'MOTORISTA' &&
    carga.motoristaId !== auth.session.motoristaId
  ) {
    return NextResponse.json({ error: 'Sem permissão' }, { status: 403 })
  }

  const result = await transicionarStatus(
    id,
    body.status,
    typeof body.observacao === 'string' ? body.observacao : undefined,
    auth.session.id
  )

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status })
  }

  return NextResponse.json(result.carga)
}

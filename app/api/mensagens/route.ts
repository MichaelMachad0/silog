import { exigirSessao, isMotorista } from '@/lib/api-auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const auth = await exigirSessao('mensagens')
  if (!auth.ok) return auth.response

  const { searchParams } = new URL(req.url)
  const cargaId = searchParams.get('cargaId')

  const mensagens = await prisma.mensagemLog.findMany({
    where: {
      ...(cargaId ? { cargaId } : {}),
      ...(isMotorista(auth.session.perfil)
        ? { carga: { motoristaId: auth.session.motoristaId! } }
        : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: {
      carga: { select: { origem: true, destino: true } },
    },
  })

  return NextResponse.json(mensagens)
}

import { eventoMensagem } from '@/lib/eventos-operacionais'
import { mensagemParaStatus } from '@/lib/mensagem-templates'
import { prisma } from '@/lib/prisma'
import { enviarWhatsApp } from '@/lib/whatsapp'
import { Prisma, StatusCarga, StatusMensagem } from '@prisma/client'

type CargaNotificavel = Prisma.CargaGetPayload<{
  include: {
    motorista: { select: { nome: true; telefone: true } }
    veiculo: { select: { placa: true } }
    viagem: { select: { id: true } }
  }
}>

export async function notificarMotoristaStatus(
  carga: CargaNotificavel,
  statusNovo: StatusCarga,
  cargaEventoId: string
) {
  const conteudo = mensagemParaStatus(statusNovo, {
    origem: carga.origem,
    destino: carga.destino,
    motorista: carga.motorista,
    veiculo: carga.veiculo,
  })

  if (!conteudo) return

  const telefone = carga.motorista.telefone?.trim()
  if (!telefone) {
    const log = await prisma.mensagemLog.create({
      data: {
        cargaId: carga.id,
        cargaEventoId,
        telefone: '-',
        conteudo,
        status: StatusMensagem.IGNORADA,
        erro: 'Motorista sem telefone cadastrado',
      },
    })
    await eventoMensagem(carga.id, log.id, StatusMensagem.IGNORADA, carga.viagem?.id)
    return
  }

  const log = await prisma.mensagemLog.create({
    data: {
      cargaId: carga.id,
      cargaEventoId,
      telefone,
      conteudo,
      status: StatusMensagem.PENDENTE,
    },
  })

  const resultado = await enviarWhatsApp(telefone, conteudo)

  if (resultado.ok) {
    await prisma.mensagemLog.update({
      where: { id: log.id },
      data: {
        status: StatusMensagem.ENVIADA,
        providerId: resultado.providerId,
        enviadaEm: new Date(),
      },
    })
    await eventoMensagem(carga.id, log.id, StatusMensagem.ENVIADA, carga.viagem?.id)
    return
  }

  const ignorada =
    resultado.error?.includes('desabilitado') ||
    resultado.error?.includes('não configurados')

  const statusFinal = ignorada ? StatusMensagem.IGNORADA : StatusMensagem.FALHA

  await prisma.mensagemLog.update({
    where: { id: log.id },
    data: {
      status: statusFinal,
      erro: resultado.error,
    },
  })

  await eventoMensagem(carga.id, log.id, statusFinal, carga.viagem?.id)
}

export function agendarNotificacaoMotorista(
  carga: CargaNotificavel,
  statusNovo: StatusCarga,
  cargaEventoId: string
) {
  void notificarMotoristaStatus(carga, statusNovo, cargaEventoId).catch((e) => {
    console.error('[notificarMotoristaStatus]', e)
  })
}

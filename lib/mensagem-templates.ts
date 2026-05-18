import { STATUS_LABEL } from '@/lib/carga-status'
import { StatusCarga } from '@prisma/client'

type DadosCarga = {
  origem: string
  destino: string
  motorista: { nome: string }
  veiculo: { placa: string }
}

const TEMPLATES: Partial<Record<StatusCarga, (d: DadosCarga) => string>> = {
  LIBERADA: (d) =>
    `Olá ${d.motorista.nome}! Carga liberada: ${d.origem} → ${d.destino}. Veículo ${d.veiculo.placa}. Confirme disponibilidade.`,
  EM_TRANSITO: (d) =>
    `SILOG: carga ${d.origem} → ${d.destino} em trânsito. Placa ${d.veiculo.placa}.`,
  ENTREGUE: (d) =>
    `SILOG: entrega concluída — ${d.origem} → ${d.destino}. Obrigado, ${d.motorista.nome}!`,
  CANCELADA: (d) =>
    `SILOG: carga ${d.origem} → ${d.destino} foi cancelada. Qualquer dúvida, fale com a operação.`,
}

export function mensagemParaStatus(
  status: StatusCarga,
  dados: DadosCarga
): string | null {
  const template = TEMPLATES[status]
  if (!template) return null

  const texto = template(dados)
  return `${texto}\nStatus: ${STATUS_LABEL[status]}`
}

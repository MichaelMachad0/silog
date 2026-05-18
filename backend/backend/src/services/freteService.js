function calcularFrete(carga) {
  const IMPOSTO = 0.2065;
  const MARGEM = 0.15;

  const custoBase = carga.valorMotorista;
  const pedagio = carga.pedagio || 0;
  const custoExtra = carga.custoExtra || 0;

  const custoTotal = custoBase + pedagio + custoExtra;
  const custoComImposto = custoTotal / (1 - IMPOSTO);
  const freteEmpresa = custoComImposto / (1 - MARGEM);

  return {
    custoMotorista: custoBase,
    custoTotal: custoTotal,
    impostos: +(custoComImposto - custoTotal).toFixed(2),
    freteEmpresa: +freteEmpresa.toFixed(2),
    margem: +(freteEmpresa - custoComImposto).toFixed(2),
  };
}

async function calcularFretePorRota(carga, prisma) {
  const tabela = await prisma.tabelaFrete.findFirst({
    where: {
      origem: carga.origem,
      destino: carga.destino,
      tipoVeiculo: carga.tipoVeiculo,
    },
  });

  if (!tabela) {
    throw new Error("Rota não encontrada na tabela de frete");
  }

  const valorMotorista = tabela.valorMotoristaBase;

  const frete = calcularFrete({
    valorMotorista: valorMotorista,
    pedagio: tabela.pedagio || 0,
  });

  return {
    ...frete,
    valorMotoristaSugerido: valorMotorista,
  };
}

module.exports = { calcularFrete, calcularFretePorRota };
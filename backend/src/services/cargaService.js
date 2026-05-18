const prisma = require("../prisma/client");

function criarErroValidacao(mensagem) {
  const erro = new Error(mensagem);
  erro.statusCode = 400;
  return erro;
}

async function criarCarga(data) {
  try {
    const {
      cliente,
      origem,
      destino,
      peso,
      tipoVeiculo,
      status,
      motoristaId,
      frete,
      entregas,
    } = data || {};

    if (!cliente || !origem || !destino) {
      throw criarErroValidacao("cliente, origem e destino sao obrigatorios");
    }

    if (typeof peso !== "number" || Number.isNaN(peso) || peso <= 0) {
      throw criarErroValidacao("peso deve ser um numero maior que zero");
    }

    if (!frete || typeof frete !== "object") {
      throw criarErroValidacao("dados de frete sao obrigatorios");
    }

    if (
      typeof frete.valorEmpresa !== "number" ||
      Number.isNaN(frete.valorEmpresa) ||
      typeof frete.valorMotorista !== "number" ||
      Number.isNaN(frete.valorMotorista)
    ) {
      throw criarErroValidacao(
        "frete.valorEmpresa e frete.valorMotorista devem ser numeros"
      );
    }

    if (!Array.isArray(entregas) || entregas.length === 0) {
      throw criarErroValidacao("entregas deve ser um array com pelo menos 1 item");
    }

    const entregasNormalizadas = entregas.map((entrega, index) => {
      const { cidade, estado, peso: pesoEntrega } = entrega || {};

      if (!cidade || !estado) {
        throw criarErroValidacao(
          `entregas[${index}] deve possuir cidade e estado`
        );
      }

      if (
        typeof pesoEntrega !== "number" ||
        Number.isNaN(pesoEntrega) ||
        pesoEntrega <= 0
      ) {
        throw criarErroValidacao(
          `entregas[${index}].peso deve ser um numero maior que zero`
        );
      }

      return { cidade, estado, peso: pesoEntrega };
    });

    return prisma.$transaction(async (tx) => {
      const cargaCriada = await tx.carga.create({
        data: {
          cliente,
          origem,
          destino,
          peso,
          tipoVeiculo: tipoVeiculo || null,
          status: status || "PENDENTE",
          motoristaId: motoristaId || null,
        },
      });

      await tx.frete.create({
        data: {
          cargaId: cargaCriada.id,
          valorEmpresa: frete.valorEmpresa,
          valorMotorista: frete.valorMotorista,
          margem:
            typeof frete.margem === "number" && !Number.isNaN(frete.margem)
              ? frete.margem
              : 0,
          pedagio:
            typeof frete.pedagio === "number" && !Number.isNaN(frete.pedagio)
              ? frete.pedagio
              : null,
          custoExtra:
            typeof frete.custoExtra === "number" &&
            !Number.isNaN(frete.custoExtra)
              ? frete.custoExtra
              : null,
        },
      });

      await tx.entrega.createMany({
        data: entregasNormalizadas.map((entrega) => ({
          ...entrega,
          cargaId: cargaCriada.id,
        })),
      });

      return tx.carga.findUnique({
        where: { id: cargaCriada.id },
        include: {
          frete: true,
          entregas: true,
          motorista: true,
        },
      });
    });
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    const erroControlado = new Error("Erro interno ao criar carga");
    erroControlado.statusCode = 500;
    throw erroControlado;
  }
}

async function listarCargas() {
  try {
    return prisma.carga.findMany({
      include: {
        motorista: true,
        entregas: true,
        frete: true,
      },
    });
  } catch (error) {
    const erroControlado = new Error("Erro interno ao listar cargas");
    erroControlado.statusCode = 500;
    throw erroControlado;
  }
}

module.exports = {
  criarCarga,
  listarCargas,
};
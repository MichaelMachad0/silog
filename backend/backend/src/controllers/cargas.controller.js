const { PrismaClient } = require("@prisma/client");
const { calcularFretePorRota } = require("../services/freteService");

const prisma = new PrismaClient();

async function listar(req, res) {
  try {
    const cargas = await prisma.carga.findMany({
      include: {
        motorista: true,
        frete: true,
      },
    });

    res.json(cargas);
  } catch (error) {
    console.error("ERRO AO LISTAR CARGAS:", error);
    res.status(500).json({ error: error.message });
  }
}

async function testeFrete(req, res) {
  try {
    const frete = await calcularFretePorRota(
      {
        origem: "BA",
        destino: "PE",
        tipoVeiculo: "carreta",
      },
      prisma
    );

    res.json(frete);
  } catch (error) {
    console.error("ERRO NO TESTE DE FRETE:", error);
    res.status(500).json({ erro: error.message });
  }
}

async function criar(req, res) {
  try {
    const {
      origem,
      destino,
      tipoVeiculo,
      peso,
      status,
      motoristaId,
    } = req.body;

    if (!origem || !destino || !tipoVeiculo) {
      return res.status(400).json({
        erro: "origem, destino e tipoVeiculo são obrigatórios",
      });
    }

    const freteCalculado = await calcularFretePorRota(
      {
        origem,
        destino,
        tipoVeiculo,
      },
      prisma
    );

    const carga = await prisma.carga.create({
      data: {
        origem,
        destino,
        peso: peso || 0,
        status: status || "PENDENTE",
        motoristaId: motoristaId || null,

        valorFrete: freteCalculado.freteEmpresa,

        frete: {
          create: {
            valorMotorista: freteCalculado.valorMotoristaSugerido,
            pedagio: freteCalculado.custoTotal - freteCalculado.custoMotorista,
            margem: freteCalculado.margem,
          },
        },
      },
      include: {
        motorista: true,
        frete: true,
      },
    });

    res.status(201).json({
      mensagem: "Carga criada com frete automático",
      carga,
      calculoFrete: freteCalculado,
    });
  } catch (error) {
    console.error("ERRO AO CRIAR CARGA:", error);
    res.status(500).json({ erro: error.message });
  }
}

async function atribuirMotorista(req, res) {
  const { id } = req.params;
  const { motoristaId } = req.body;

  try {
    const carga = await prisma.carga.update({
      where: { id: Number(id) },
      data: { motoristaId },
    });

    res.json(carga);
  } catch (error) {
    console.error("ERRO AO ATRIBUIR MOTORISTA:", error);
    res.status(500).json({ error: error.message });
  }
}

async function atualizarStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const carga = await prisma.carga.update({
      where: { id: Number(id) },
      data: { status },
    });

    res.json(carga);
  } catch (error) {
    console.error("ERRO AO ATUALIZAR STATUS:", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listar,
  testeFrete,
  criar,
  atribuirMotorista,
  atualizarStatus,
};
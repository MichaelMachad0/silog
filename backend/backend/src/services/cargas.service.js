const prisma = require("../prisma/client");

async function criarCarga(data) {
  const { origem, destino, peso, valorFrete, status, motoristaId, entregas } = data;

  return prisma.carga.create({
    data: {
      origem,
      destino,
      peso,
      valorFrete,
      status,
      motoristaId,
      entregas: entregas && entregas.length
        ? {
            create: entregas.map((entrega) => ({
              cidade: entrega.cidade,
              estado: entrega.estado,
              peso: entrega.peso,
            })),
          }
        : undefined,
    },
    include: {
      motorista: true,
      entregas: true,
      frete: true,
    },
  });
}

async function listarCargas() {
  return prisma.carga.findMany({
    include: {
      motorista: true,
      entregas: true,
      frete: true,
    },
  });
}

module.exports = {
  criarCarga,
  listarCargas,
};
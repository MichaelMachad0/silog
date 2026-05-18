const prisma = require("../prisma/client");

async function criarMotorista(data) {
  const { nome, cpf, telefone } = data;

  if (!nome || !cpf) {
    throw new Error("Nome e CPF são obrigatórios");
  }

  const motoristaExistente = await prisma.motorista.findUnique({
    where: { cpf }
  });

  if (motoristaExistente) {
    throw new Error("Já existe um motorista com esse CPF");
  }

  const motorista = await prisma.motorista.create({
    data: {
      nome,
      cpf,
      telefone
    }
  });

  return motorista;
}

module.exports = {
  criarMotorista
};

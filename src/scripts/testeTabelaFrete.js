const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const registro = await prisma.tabelaFrete.create({
    data: {
      origem: "BA",
      destino: "PE",
      tipoVeiculo: "carreta",
      valorMotoristaBase: 5000,
      pedagio: 300
    }
  });

  console.log("Registro criado:", registro);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
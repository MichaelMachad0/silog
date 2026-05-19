import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const SENHA_PADRAO = "silog123";

async function main() {
  const senhaHash = await hash(SENHA_PADRAO, 10);

  await prisma.usuario.upsert({
    where: { email: "admin@silog.com.br" },
    update: {
      nome: "Administrador SILOG",
      senhaHash,
      perfil: "ADMIN",
      ativo: true,
    },
    create: {
      email: "admin@silog.com.br",
      nome: "Administrador SILOG",
      senhaHash,
      perfil: "ADMIN",
      ativo: true,
    },
  });

  const motoristas = [
    {
      nome: "João Silva",
      cpf: "12345678901",
      telefone: "(71) 99999-9999",
      cnh: "12345678900",
      status: "ATIVO",
    },
    {
      nome: "Maria Santos",
      cpf: "98765432100",
      telefone: "(71) 98888-8888",
      cnh: "98765432100",
      status: "ATIVO",
    },
  ];

  for (const motorista of motoristas) {
    await prisma.motorista.upsert({
      where: { cpf: motorista.cpf },
      update: motorista,
      create: motorista,
    });
  }

  console.log("Seed concluído:");
  console.log("- Usuário admin: admin@silog.com.br / silog123");
  console.log(`- ${motoristas.length} motoristas`);
}

main()
  .catch((erro) => {
    console.error(erro);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

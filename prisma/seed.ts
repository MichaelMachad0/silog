import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const senhaAdmin = await bcrypt.hash('admin123', 10)
  const senhaOperador = await bcrypt.hash('oper123', 10)
  const senhaMotorista = await bcrypt.hash('mot123', 10)

  const motorista = await prisma.motorista.upsert({
    where: { cpf: '00000000000' },
    update: {},
    create: {
      nome: 'João Silva',
      cpf: '00000000000',
      telefone: '11999990000',
      cnh: '12345678900',
    },
  })

  const veiculo = await prisma.veiculo.upsert({
    where: { placa: 'ABC1D23' },
    update: {},
    create: {
      placa: 'ABC1D23',
      tipo: 'Carreta',
      marca: 'Volvo',
      modelo: 'FH',
      motoristaId: motorista.id,
    },
  })

  await prisma.usuario.upsert({
    where: { email: 'admin@silog.com' },
    update: {},
    create: {
      email: 'admin@silog.com',
      nome: 'Administrador',
      senhaHash: senhaAdmin,
      perfil: 'ADMIN',
    },
  })

  await prisma.usuario.upsert({
    where: { email: 'operador@silog.com' },
    update: {},
    create: {
      email: 'operador@silog.com',
      nome: 'Operador Logística',
      senhaHash: senhaOperador,
      perfil: 'OPERADOR',
    },
  })

  await prisma.usuario.upsert({
    where: { email: 'motorista@silog.com' },
    update: {},
    create: {
      email: 'motorista@silog.com',
      nome: motorista.nome,
      senhaHash: senhaMotorista,
      perfil: 'MOTORISTA',
      motoristaId: motorista.id,
    },
  })

  console.log('Seed OK')
  console.log('  admin@silog.com / admin123')
  console.log('  operador@silog.com / oper123')
  console.log('  motorista@silog.com / mot123')
  console.log(`  Motorista: ${motorista.nome}, Veículo: ${veiculo.placa}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

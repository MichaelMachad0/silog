-- CreateEnum
CREATE TYPE "PerfilUsuario" AS ENUM ('ADMIN', 'OPERADOR', 'MOTORISTA');
CREATE TYPE "StatusViagem" AS ENUM ('PLANEJADA', 'EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA');
CREATE TYPE "TipoEventoOperacional" AS ENUM (
  'CARGA_CRIADA',
  'MOTORISTA_VINCULADO',
  'CARGA_LIBERADA',
  'VIAGEM_INICIADA',
  'CHEGADA_CLIENTE',
  'VIAGEM_CONCLUIDA',
  'CARGA_CANCELADA',
  'STATUS_ALTERADO',
  'MENSAGEM_ENVIADA',
  'MENSAGEM_FALHA'
);

-- CreateTable Usuario
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "perfil" "PerfilUsuario" NOT NULL DEFAULT 'OPERADOR',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "motoristaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable Viagem
CREATE TABLE "Viagem" (
    "id" TEXT NOT NULL,
    "cargaId" TEXT NOT NULL,
    "motoristaId" TEXT NOT NULL,
    "veiculoId" TEXT NOT NULL,
    "status" "StatusViagem" NOT NULL DEFAULT 'PLANEJADA',
    "iniciadaEm" TIMESTAMP(3),
    "concluidaEm" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Viagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable EventoOperacional
CREATE TABLE "EventoOperacional" (
    "id" TEXT NOT NULL,
    "tipo" "TipoEventoOperacional" NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "cargaId" TEXT,
    "viagemId" TEXT,
    "mensagemId" TEXT,
    "criadoPorId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventoOperacional_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
CREATE UNIQUE INDEX "Usuario_motoristaId_key" ON "Usuario"("motoristaId");
CREATE UNIQUE INDEX "Viagem_cargaId_key" ON "Viagem"("cargaId");
CREATE INDEX "Viagem_motoristaId_idx" ON "Viagem"("motoristaId");
CREATE INDEX "Viagem_status_idx" ON "Viagem"("status");
CREATE UNIQUE INDEX "EventoOperacional_mensagemId_key" ON "EventoOperacional"("mensagemId");
CREATE INDEX "EventoOperacional_cargaId_idx" ON "EventoOperacional"("cargaId");
CREATE INDEX "EventoOperacional_viagemId_idx" ON "EventoOperacional"("viagemId");
CREATE INDEX "EventoOperacional_createdAt_idx" ON "EventoOperacional"("createdAt");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Viagem" ADD CONSTRAINT "Viagem_cargaId_fkey" FOREIGN KEY ("cargaId") REFERENCES "Carga"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Viagem" ADD CONSTRAINT "Viagem_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Viagem" ADD CONSTRAINT "Viagem_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "Veiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "EventoOperacional" ADD CONSTRAINT "EventoOperacional_cargaId_fkey" FOREIGN KEY ("cargaId") REFERENCES "Carga"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "EventoOperacional" ADD CONSTRAINT "EventoOperacional_viagemId_fkey" FOREIGN KEY ("viagemId") REFERENCES "Viagem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "EventoOperacional" ADD CONSTRAINT "EventoOperacional_mensagemId_fkey" FOREIGN KEY ("mensagemId") REFERENCES "MensagemLog"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "EventoOperacional" ADD CONSTRAINT "EventoOperacional_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

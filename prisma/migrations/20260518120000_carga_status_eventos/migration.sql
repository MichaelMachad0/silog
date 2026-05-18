-- Upgrade: schema init (legado) → schema operacional atual (Prisma)
-- Converte status TEXT existente para enum; não adiciona coluna duplicada.

-- CreateEnum
CREATE TYPE "StatusCarga" AS ENUM ('CRIADA', 'LIBERADA', 'EM_TRANSITO', 'ENTREGUE', 'CANCELADA');

-- CreateEnum
CREATE TYPE "StatusMensagem" AS ENUM ('PENDENTE', 'ENVIADA', 'FALHA', 'IGNORADA');

-- DropForeignKey
ALTER TABLE "Carga" DROP CONSTRAINT "Carga_motoristaId_fkey";

-- DropForeignKey
ALTER TABLE "Entrega" DROP CONSTRAINT "Entrega_cargaId_fkey";

-- DropForeignKey
ALTER TABLE "Frete" DROP CONSTRAINT "Frete_cargaId_fkey";

-- DropForeignKey
ALTER TABLE "Veiculo" DROP CONSTRAINT "Veiculo_motoristaId_fkey";

-- AlterTable
ALTER TABLE "Carga" DROP CONSTRAINT "Carga_pkey",
DROP COLUMN "valorFrete",
ADD COLUMN     "entregueEm" TIMESTAMP(3),
ADD COLUMN     "rastreadoEm" TIMESTAMP(3),
ADD COLUMN     "valorNota" DOUBLE PRECISION,
ADD COLUMN     "veiculoId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT USING id::text,
ALTER COLUMN "peso" DROP NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "StatusCarga" NOT NULL DEFAULT 'CRIADA',
ALTER COLUMN "motoristaId" SET DATA TYPE TEXT USING "motoristaId"::text,
ADD CONSTRAINT "Carga_pkey" PRIMARY KEY ("id");
DROP SEQUENCE IF EXISTS "Carga_id_seq";

-- AlterTable
ALTER TABLE "Frete" DROP CONSTRAINT "Frete_pkey",
DROP COLUMN "margem",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "impostos" DOUBLE PRECISION,
ADD COLUMN     "lucro" DOUBLE PRECISION,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT USING id::text,
ALTER COLUMN "cargaId" SET DATA TYPE TEXT USING "cargaId"::text,
ADD CONSTRAINT "Frete_pkey" PRIMARY KEY ("id");
DROP SEQUENCE IF EXISTS "Frete_id_seq";

-- AlterTable
ALTER TABLE "Motorista" DROP CONSTRAINT "Motorista_pkey",
DROP COLUMN "rntrc",
ADD COLUMN     "cnh" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "validadeCNH" TIMESTAMP(3),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT USING id::text,
ADD CONSTRAINT "Motorista_pkey" PRIMARY KEY ("id");
DROP SEQUENCE IF EXISTS "Motorista_id_seq";

-- AlterTable
ALTER TABLE "Veiculo" DROP CONSTRAINT "Veiculo_pkey",
DROP COLUMN "carroceria",
ADD COLUMN     "ano" INTEGER,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "marca" TEXT,
ADD COLUMN     "modelo" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT USING id::text,
ALTER COLUMN "motoristaId" SET DATA TYPE TEXT USING "motoristaId"::text,
ADD CONSTRAINT "Veiculo_pkey" PRIMARY KEY ("id");
DROP SEQUENCE IF EXISTS "Veiculo_id_seq";

-- DropTable
DROP TABLE "Entrega";

-- DropTable
DROP TABLE "TabelaFrete";

-- CreateTable
CREATE TABLE "CargaEvento" (
    "id" TEXT NOT NULL,
    "cargaId" TEXT NOT NULL,
    "statusAnterior" "StatusCarga",
    "statusNovo" "StatusCarga" NOT NULL,
    "observacao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CargaEvento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MensagemLog" (
    "id" TEXT NOT NULL,
    "cargaId" TEXT NOT NULL,
    "cargaEventoId" TEXT,
    "telefone" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "status" "StatusMensagem" NOT NULL DEFAULT 'PENDENTE',
    "providerId" TEXT,
    "erro" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enviadaEm" TIMESTAMP(3),

    CONSTRAINT "MensagemLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CargaEvento_cargaId_idx" ON "CargaEvento"("cargaId");

-- CreateIndex
CREATE UNIQUE INDEX "MensagemLog_cargaEventoId_key" ON "MensagemLog"("cargaEventoId");

-- CreateIndex
CREATE INDEX "MensagemLog_cargaId_idx" ON "MensagemLog"("cargaId");

-- AddForeignKey
ALTER TABLE "Veiculo" ADD CONSTRAINT "Veiculo_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carga" ADD CONSTRAINT "Carga_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carga" ADD CONSTRAINT "Carga_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "Veiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargaEvento" ADD CONSTRAINT "CargaEvento_cargaId_fkey" FOREIGN KEY ("cargaId") REFERENCES "Carga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MensagemLog" ADD CONSTRAINT "MensagemLog_cargaId_fkey" FOREIGN KEY ("cargaId") REFERENCES "Carga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MensagemLog" ADD CONSTRAINT "MensagemLog_cargaEventoId_fkey" FOREIGN KEY ("cargaEventoId") REFERENCES "CargaEvento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Frete" ADD CONSTRAINT "Frete_cargaId_fkey" FOREIGN KEY ("cargaId") REFERENCES "Carga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- NOT NULL após FKs (permite banco vazio ou dados sem carga)
ALTER TABLE "Carga" ALTER COLUMN "motoristaId" SET NOT NULL;
ALTER TABLE "Carga" ALTER COLUMN "veiculoId" SET NOT NULL;

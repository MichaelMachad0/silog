-- CreateEnum
CREATE TYPE "StatusCarga" AS ENUM ('CRIADA', 'LIBERADA', 'EM_TRANSITO', 'ENTREGUE', 'CANCELADA');

-- AlterTable
ALTER TABLE "Carga" ADD COLUMN     "status" "StatusCarga" NOT NULL DEFAULT 'CRIADA',
ADD COLUMN     "rastreadoEm" TIMESTAMP(3),
ADD COLUMN     "entregueEm" TIMESTAMP(3);

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

-- CreateIndex
CREATE INDEX "CargaEvento_cargaId_idx" ON "CargaEvento"("cargaId");

-- AddForeignKey
ALTER TABLE "CargaEvento" ADD CONSTRAINT "CargaEvento_cargaId_fkey" FOREIGN KEY ("cargaId") REFERENCES "Carga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

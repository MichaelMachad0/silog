/*
  Warnings:

  - You are about to drop the column `valorFrete` on the `Carga` table. All the data in the column will be lost.
  - Added the required column `cliente` to the `Carga` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Frete" ADD COLUMN "custoExtra" REAL;
ALTER TABLE "Frete" ADD COLUMN "pedagio" REAL;

-- AlterTable
ALTER TABLE "TabelaFrete" ADD COLUMN "custoExtra" REAL;
ALTER TABLE "TabelaFrete" ADD COLUMN "icmsPercentual" REAL;
ALTER TABLE "TabelaFrete" ADD COLUMN "observacao" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Carga" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cliente" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "peso" REAL NOT NULL,
    "tipoVeiculo" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "motoristaId" INTEGER,
    CONSTRAINT "Carga_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Carga" ("createdAt", "destino", "id", "motoristaId", "origem", "peso", "status") SELECT "createdAt", "destino", "id", "motoristaId", "origem", "peso", "status" FROM "Carga";
DROP TABLE "Carga";
ALTER TABLE "new_Carga" RENAME TO "Carga";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

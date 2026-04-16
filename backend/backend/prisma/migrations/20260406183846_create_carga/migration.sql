/*
  Warnings:

  - You are about to drop the column `cliente` on the `Carga` table. All the data in the column will be lost.
  - You are about to drop the column `valorNF` on the `Carga` table. All the data in the column will be lost.
  - Added the required column `valorFrete` to the `Carga` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Carga" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "peso" REAL NOT NULL,
    "valorFrete" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "motoristaId" INTEGER,
    CONSTRAINT "Carga_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Carga" ("destino", "id", "motoristaId", "origem", "peso", "status") SELECT "destino", "id", "motoristaId", "origem", "peso", "status" FROM "Carga";
DROP TABLE "Carga";
ALTER TABLE "new_Carga" RENAME TO "Carga";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

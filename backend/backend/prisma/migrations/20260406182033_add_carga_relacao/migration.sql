-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Carga" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "peso" REAL NOT NULL,
    "cliente" TEXT NOT NULL,
    "valorNF" REAL,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "motoristaId" INTEGER,
    CONSTRAINT "Carga_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Carga" ("cliente", "destino", "id", "origem", "peso", "status", "valorNF") SELECT "cliente", "destino", "id", "origem", "peso", "status", "valorNF" FROM "Carga";
DROP TABLE "Carga";
ALTER TABLE "new_Carga" RENAME TO "Carga";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateTable
CREATE TABLE "Entrega" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "peso" REAL NOT NULL,
    "cargaId" INTEGER NOT NULL,
    CONSTRAINT "Entrega_cargaId_fkey" FOREIGN KEY ("cargaId") REFERENCES "Carga" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TabelaFrete" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "tipoVeiculo" TEXT NOT NULL,
    "valorMotoristaBase" REAL NOT NULL,
    "pedagio" REAL
);

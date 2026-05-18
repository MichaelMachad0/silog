-- CreateTable
CREATE TABLE "Motorista" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT,
    "rntrc" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ATIVO'
);

-- CreateTable
CREATE TABLE "Veiculo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "placa" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "carroceria" TEXT NOT NULL,
    "motoristaId" INTEGER NOT NULL,
    CONSTRAINT "Veiculo_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Carga" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "peso" REAL NOT NULL,
    "cliente" TEXT NOT NULL,
    "valorNF" REAL,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE'
);

-- CreateTable
CREATE TABLE "Frete" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cargaId" INTEGER NOT NULL,
    "valorEmpresa" REAL NOT NULL,
    "valorMotorista" REAL NOT NULL,
    "margem" REAL NOT NULL,
    CONSTRAINT "Frete_cargaId_fkey" FOREIGN KEY ("cargaId") REFERENCES "Carga" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Motorista_cpf_key" ON "Motorista"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Veiculo_placa_key" ON "Veiculo"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "Frete_cargaId_key" ON "Frete"("cargaId");

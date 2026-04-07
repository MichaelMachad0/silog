require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ROTAS
const motoristasRoutes = require("./routes/motoristas.routes");
const cargasRoutes = require("./routes/cargas.routes");
const clientesRoutes = require("./routes/clientes.routes");
const veiculosRoutes = require("./routes/veiculos.routes");

app.use("/motoristas", motoristasRoutes);
app.use("/cargas", cargasRoutes);
app.use("/clientes", clientesRoutes);
app.use("/veiculos", veiculosRoutes);

// TESTE
app.get("/", (req, res) => {
  res.send("SILOG API online");
});

app.listen(3001, () => {
  console.log("SILOG API rodando em http://localhost:3001");
});

// criar motorista
app.post("/motoristas", async (req, res) => {
  try {
    const { nome, cpf, telefone, rntrc } = req.body;

    const existente = await prisma.motorista.findUnique({
      where: { cpf },
    });

    if (existente) {
      return res.status(400).json({
        erro: "CPF já cadastrado",
        motorista: existente,
      });
    }

    const motorista = await prisma.motorista.create({
      data: {
        nome,
        cpf,
        telefone,
        rntrc,
      },
    });

    res.status(201).json(motorista);
  } catch (error) {
    console.error("ERRO AO CRIAR MOTORISTA:", error);
    res.status(500).json({ erro: error.message });
  }
});

// listar motoristas
app.get("/motoristas", async (req, res) => {
  try {
    const motoristas = await prisma.motorista.findMany({
      include: { veiculos: true },
    });
    res.json(motoristas);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// criar carga
app.post("/motoristas", async (req, res) => {
  try {
    const { nome, cpf, telefone, rntrc } = req.body;

    const existente = await prisma.motorista.findUnique({
      where: { cpf },
    });

    if (existente) {
      return res.status(400).json({
        erro: "CPF já cadastrado",
        motorista: existente,
      });
    }

    const motorista = await prisma.motorista.create({
      data: {
        nome,
        cpf,
        telefone,
        rntrc,
      },
    });

    res.status(201).json(motorista);
  } catch (error) {
    console.error("ERRO AO CRIAR MOTORISTA:", error);
    res.status(500).json({ erro: error.message });
  }
});

// listar cargas
app.get("/cargas", async (req, res) => {
  try {
    const cargas = await prisma.carga.findMany({
      include: {
        motorista: true,
        frete: true,
      },
    });

    res.json(cargas);
  } catch (error) {
    console.error("ERRO AO LISTAR CARGAS:", error);
    res.status(500).json({ error: error.message });
  }
});

// atribuir motorista à carga
app.put("/cargas/:id/atribuir", async (req, res) => {
  const { id } = req.params;
  const { motoristaId } = req.body;

  try {
    const carga = await prisma.carga.update({
      where: { id: Number(id) },
      data: { motoristaId },
    });

    res.json(carga);
  } catch (error) {
    console.error("ERRO AO ATRIBUIR MOTORISTA:", error);
    res.status(500).json({ error: error.message });
  }
});

// atualizar status da carga
app.put("/cargas/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const carga = await prisma.carga.update({
      where: { id: Number(id) },
      data: { status },
    });

    res.json(carga);
  } catch (error) {
    console.error("ERRO AO ATUALIZAR STATUS:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("SILOG API rodando em http://localhost:3001");
});
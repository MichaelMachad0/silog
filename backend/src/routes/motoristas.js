const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// LISTAR TODOS
router.get("/", async (req, res) => {
  try {
    const motoristas = await prisma.motorista.findMany({
      include: {
        veiculos: true,
        cargas: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    res.json(motoristas);
  } catch (error) {
    console.error("Erro ao listar motoristas:", error);
    res.status(500).json({ error: "Erro ao listar motoristas" });
  }
});

// BUSCAR POR ID
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const motorista = await prisma.motorista.findUnique({
      where: { id },
      include: {
        veiculos: true,
        cargas: true,
      },
    });

    if (!motorista) {
      return res.status(404).json({ error: "Motorista não encontrado" });
    }

    res.json(motorista);
  } catch (error) {
    console.error("Erro ao buscar motorista:", error);
    res.status(500).json({ error: "Erro ao buscar motorista" });
  }
});

// CRIAR
router.post("/", async (req, res) => {
  try {
    const {
      nome,
      cpf,
      telefone,
      telefoneSecundario,
      email,
      dataNascimento,
      endereco,
      cidade,
      estado,
      cep,
      cnhNumero,
      cnhCategoria,
      cnhValidade,
      ear,
      rntrc,
      rntrcCategoria,
      rntrcValidade,
      rntrcSituacao,
      bancoNome,
      bancoAgencia,
      bancoConta,
      bancoTipoConta,
      pixChave,
      pixTipo,
      favorecidoNome,
      favorecidoCpf,
      statusCadastro,
      statusOperacional,
      classificacaoRisco,
      perfilOperacional,
      tipoEquipamento,
      observacoes,
    } = req.body;

    if (!nome || !cpf) {
      return res.status(400).json({ error: "Nome e CPF são obrigatórios" });
    }

    const motoristaExistente = await prisma.motorista.findUnique({
      where: { cpf },
    });

    if (motoristaExistente) {
      return res.status(409).json({ error: "Já existe motorista com este CPF" });
    }

    const motorista = await prisma.motorista.create({
      data: {
        nome,
        cpf,
        telefone,
        telefoneSecundario,
        email,
        dataNascimento: dataNascimento ? new Date(dataNascimento) : null,
        endereco,
        cidade,
        estado,
        cep,
        cnhNumero,
        cnhCategoria,
        cnhValidade: cnhValidade ? new Date(cnhValidade) : null,
        ear: Boolean(ear),
        rntrc,
        rntrcCategoria,
        rntrcValidade: rntrcValidade ? new Date(rntrcValidade) : null,
        rntrcSituacao,
        bancoNome,
        bancoAgencia,
        bancoConta,
        bancoTipoConta,
        pixChave,
        pixTipo,
        favorecidoNome,
        favorecidoCpf,
        statusCadastro: statusCadastro || "PENDENTE",
        statusOperacional: statusOperacional || "ATIVO",
        classificacaoRisco: classificacaoRisco || "OK",
        perfilOperacional,
        tipoEquipamento,
        observacoes,
      },
    });

    res.status(201).json(motorista);
  } catch (error) {
    console.error("Erro ao criar motorista:", error);
    res.status(500).json({ error: "Erro ao criar motorista" });
  }
});

// ATUALIZAR
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const motorista = await prisma.motorista.update({
      where: { id },
      data: {
        ...req.body,
        dataNascimento: req.body.dataNascimento ? new Date(req.body.dataNascimento) : undefined,
        cnhValidade: req.body.cnhValidade ? new Date(req.body.cnhValidade) : undefined,
        rntrcValidade: req.body.rntrcValidade ? new Date(req.body.rntrcValidade) : undefined,
      },
    });

    res.json(motorista);
  } catch (error) {
    console.error("Erro ao atualizar motorista:", error);
    res.status(500).json({ error: "Erro ao atualizar motorista" });
  }
});

// EXCLUIR
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.motorista.delete({
      where: { id },
    });

    res.json({ message: "Motorista removido com sucesso" });
  } catch (error) {
    console.error("Erro ao remover motorista:", error);
    res.status(500).json({ error: "Erro ao remover motorista" });
  }
});

module.exports = router;
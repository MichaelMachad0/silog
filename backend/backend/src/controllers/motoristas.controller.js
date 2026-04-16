const prisma = require("../prisma/client");

exports.create = async (req, res) => {
  try {
    const motorista = await prisma.motorista.create({
      data: req.body,
    });
    res.status(201).json(motorista);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.list = async (req, res) => {
  const motoristas = await prisma.motorista.findMany({
    include: { veiculos: true },
  });
  res.json(motoristas);
};
const motoristaService = require("../services/motoristaService");

async function criarMotorista(req, res) {
  try {
    const motorista = await motoristaService.criarMotorista(req.body);
    return res.status(201).json(motorista);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

module.exports = {
  criarMotorista
};

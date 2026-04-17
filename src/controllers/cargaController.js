const cargaService = require("../services/cargaService");

async function criarCarga(req, res) {
  try {
    const carga = await cargaService.criarCarga(req.body);
    return res.status(201).json({
      sucesso: true,
      dados: carga,
      erro: null,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      sucesso: false,
      dados: {},
      erro: error.message || "Erro interno ao criar carga",
    });
  }
}

async function listarCargas(req, res) {
  try {
    const cargas = await cargaService.listarCargas();
    return res.status(200).json({
      sucesso: true,
      dados: cargas,
      erro: null,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      sucesso: false,
      dados: {},
      erro: error.message || "Erro interno ao listar cargas",
    });
  }
}

module.exports = {
  criarCarga,
  listarCargas,
};
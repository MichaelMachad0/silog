const cargaService = require("../services/cargaService");

async function criarCarga(req, res) {
  try {
    const carga = await cargaService.criarCarga(req.body);
    return res.status(201).json({
      success: true,
      dados: carga,
      erro: null,
    });
  } catch (error) {
    console.error("ERRO CRIAR CARGA:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      dados: {},
      erro: error.message,
    });
  }
}

async function listarCargas(req, res) {
  try {
    const cargas = await cargaService.listarCargas();
    return res.status(200).json({
      success: true,
      dados: cargas,
      erro: null,
    });
  } catch (error) {
    const statusCode = error.statusCode === 400 ? 400 : 500;
    const mensagemErro =
      statusCode === 400 ? error.message : "Erro interno ao listar cargas";

    return res.status(statusCode).json({
      success: false,
      dados: {},
      erro: mensagemErro,
    });
  }
}

module.exports = {
  criarCarga,
  listarCargas,
};
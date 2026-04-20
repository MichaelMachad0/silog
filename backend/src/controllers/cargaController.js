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
    console.error("ERRO LISTAR CARGAS:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      dados: {},
      erro: error.message,
    });
  }
}

module.exports = {
  criarCarga,
  listarCargas,
};
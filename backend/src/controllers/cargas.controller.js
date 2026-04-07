const cargasService = require("../services/cargas.service");

async function criar(req, res) {
  try {
    const carga = await cargasService.criarCarga(req.body);
    res.status(201).json(carga);
  } catch (error) {
    console.error("ERRO AO CRIAR CARGA:", error);
    res.status(500).json({ error: error.message });
  }
}

async function listar(req, res) {
  try {
    const cargas = await cargasService.listarCargas();
    res.json(cargas);
  } catch (error) {
    console.error("ERRO AO LISTAR CARGAS:", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  criar,
  listar,
};
const express = require("express");
const router = express.Router();
const cargaController = require("../controllers/cargaController");

router.post("/", cargaController.criarCarga);
router.get("/", cargaController.listarCargas);

module.exports = router;
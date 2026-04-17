const express = require("express");
const router = express.Router();
const cargaController = require("../controllers/cargaController");

router.get("/cargas", cargaController.listarCargas);
router.post("/cargas", cargaController.criarCarga);

module.exports = router;
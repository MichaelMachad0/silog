const express = require("express");
const router = express.Router();
const cargasController = require("../controllers/cargas.controller");

router.get("/", cargasController.listar);
router.get("/teste-frete", cargasController.testeFrete);
router.post("/", cargasController.criar);
router.put("/:id/atribuir", cargasController.atribuirMotorista);
router.put("/:id/status", cargasController.atualizarStatus);

module.exports = router;
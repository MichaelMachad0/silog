const express = require("express");
const router = express.Router();
const motoristaController = require("../controllers/motoristaController");

router.post("/", motoristaController.criarMotorista);

module.exports = router;
const cargasRoutes = require("./routes/cargas.routes");
const clientesRoutes = require("./routes/clientes.routes");
const veiculosRoutes = require("./routes/veiculos.routes");

app.use("/cargas", cargasRoutes);
app.use("/clientes", clientesRoutes);
app.use("/veiculos", veiculosRoutes);

const express = require("express");
const router = express.Router();
const cargasController = require("../controllers/cargas.controller");

router.post("/", cargasController.criar);
router.get("/", cargasController.listar);

module.exports = router;
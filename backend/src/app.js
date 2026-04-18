const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const motoristasRoutes = require("./routes/motoristas.routes");
const cargasRoutes = require("./routes/cargas.routes");
const clientesRoutes = require("./routes/clientes.routes");
const veiculosRoutes = require("./routes/veiculos.routes");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SILOG API online");
});

app.use("/motoristas", motoristasRoutes);
app.use("/cargas", cargasRoutes);
app.use("/clientes", clientesRoutes);
app.use("/veiculos", veiculosRoutes);

app.listen(3001, () => {
  console.log("SILOG API rodando em http://localhost:3001");
});
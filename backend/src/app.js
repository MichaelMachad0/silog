const express = require("express");
const cors = require("cors");

const motoristaRoutes = require("./routes/motoristaRoutes");
const cargaRoutes = require("./routes/cargaRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const veiculoRoutes = require("./routes/veiculoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SILOG API online");
});

app.use("/motoristas", motoristaRoutes);
app.use("/cargas", cargaRoutes);
app.use("/clientes", clienteRoutes);
app.use("/veiculos", veiculoRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`SILOG API rodando em http://localhost:${PORT}`);
});
const cargasRoutes = require("./routes/cargas.routes");
const clientesRoutes = require("./routes/clientes.routes");
const veiculosRoutes = require("./routes/veiculos.routes");

app.use("/cargas", cargasRoutes);
app.use("/clientes", clientesRoutes);
app.use("/veiculos", veiculosRoutes);
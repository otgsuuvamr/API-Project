const express = require("express"); // Importa a biblioteca express.
require("./config/db");
const tasksRoutes = require("./routes/toDoRoutes");
const ToDo = require("./models/ToDo");

const app = express();
const cors = require("cors");
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Rota de boas-vindas
app.get("/", (req, res) => {
  res.status(200).send("Boas-vindas à API");
});

app.use("/tasks", tasksRoutes);

// Inicia o servidor na porta estabelecida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const mongoose = require("mongoose"); // Importa a biblioteca do MongoDB.

const ToDoSchema = new mongoose.Schema({
  // Tabela: Schema; Campos: titulo, descricao e categoria;
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
  categoria: { type: String, required: true },
});

module.exports = mongoose.model("ToDo", ToDoSchema);

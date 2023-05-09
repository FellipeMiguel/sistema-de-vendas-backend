const mongoose = require("mongoose");

const vendaSchema = new mongoose.Schema({
  nome_empresa: { type: String, required: true },
  nome_cliente: { type: String, required: true },
  cnpj: { type: String, required: true },
  telefone: { type: String, required: true },
  valor_total: { type: Number, required: true },
  valor_frete: { type: Number, required: true },
  nome_produto: { type: String, required: true },
  quantidade: { type: Number, required: true },
  compensada: { type: Number, required: true },
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

module.exports = mongoose.model("Venda", vendaSchema);

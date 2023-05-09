const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  nome_completo: {
    type: String,
    required: true,
  },
  nome_usuario: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
  cidade: {
    type: String,
    required: true,
  },
  link_foto_perfil: {
    type: String,
    required: true,
  },
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

module.exports = Usuario;

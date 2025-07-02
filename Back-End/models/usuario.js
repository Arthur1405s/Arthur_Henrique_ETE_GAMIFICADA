// models/Usuario.js

const mongoose = require('mongoose');

// Define o esquema do usuário
const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  },
  tipoUsuario: {
    type: String,
    required: true
  }
});

// Exporta o modelo de dados com o nome 'Usuario'
module.exports = mongoose.model('Usuario', UsuarioSchema);

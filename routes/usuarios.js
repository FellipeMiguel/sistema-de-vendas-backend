const express = require('express');
const router = express.Router();
const path = require('path');

const Usuario = require('../src/models/usuario');

// Rota para listar todos os usuários
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para buscar um usuário pelo ID
router.get('/:id', getUsuario, (req, res) => {
  res.json(res.usuario);
});

// Rota para criar um novo usuário
router.post('/', async (req, res) => {
  const usuario = new Usuario({
    nome_completo: req.body.nome_completo,
    nome_cliente: req.body.nome_cliente,
    senha: req.body.senha,
    email: req.body.email,
    tel: req.body.tel,
    estado: req.body.estado,
    cidade: req.body.cidade,
    link_foto_perfil: req.body.link_foto_perfil
  });

  try {
    const novoUsuario = await usuario.save();
    res.status(201).json(novoUsuario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para atualizar um usuário pelo ID
router.patch('/:id', getUsuario, async (req, res) => {
  if (req.body.nome_completo != null) {
    res.usuario.nome_completo = req.body.nome_completo;
  }
  if (req.body.nome_cliente != null) {
    res.usuario.nome_cliente = req.body.nome_cliente;
  }
  if (req.body.senha != null) {
    res.usuario.senha = req.body.senha;
  }
  if (req.body.email != null) {
    res.usuario.email = req.body.email;
  }
  if (req.body.tel != null) {
    res.usuario.tel = req.body.tel;
  }
  if (req.body.estado != null) {
    res.usuario.estado = req.body.estado;
  }
  if (req.body.cidade != null) {
    res.usuario.cidade = req.body.cidade;
  }
  if (req.body.link_foto_perfil != null) {
    res.usuario.link_foto_perfil = req.body.link_foto_perfil;
  }

  try {
    const usuarioAtualizado = await res.usuario.save();
    res.json(usuarioAtualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para deletar um usuário pelo ID
router.delete('/:id', getUsuario, async (req, res) => {
  try {
    await res.usuario.remove();
    res.json({ message: 'Usuário deletado com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware para buscar um usuário pelo ID
async function getUsuario(req, res, next) {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (usuario == null) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }
    res.usuario = usuario;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
const express = require('express');
const router = express.Router();
const path = require('path');

const Venda = require('../src/models/venda');

// Rota para listar todas as vendas
router.get('/', (req, res) => {
  Venda.find({}, (err, vendas) => {
    if (err) {
      console.log('Erro ao buscar as vendas:', err);
      res.status(500).send({ message: 'Erro ao buscar as vendas' });
    } else {
      res.status(200).send(vendas);
    }
  });
});

// Rota para buscar uma venda pelo ID
router.get('/:id', (req, res) => {
  const id = req.params.id;

  Venda.findById(id, (err, venda) => {
    if (err) {
      console.log(`Erro ao buscar a venda com ID ${id}:`, err);
      res.status(500).send({ message: `Erro ao buscar a venda com ID ${id}` });
    } else if (!venda) {
      console.log(`Venda com ID ${id} não encontrada`);
      res.status(404).send({ message: `Venda com ID ${id} não encontrada` });
    } else {
      res.status(200).send(venda);
    }
  });
});

// Rota para criar uma nova venda
router.post('/', (req, res) => {
  const venda = new Venda(req.body);

  venda.save((err, novaVenda) => {
    if (err) {
      console.log('Erro ao criar a venda:', err);
      res.status(500).send({ message: 'Erro ao criar a venda' });
    } else {
      res.status(201).send(novaVenda);
    }
  });
});

// Rota para atualizar uma venda pelo ID
router.put('/:id', (req, res) => {
  const id = req.params.id;

  Venda.findByIdAndUpdate(id, req.body, { new: true }, (err, vendaAtualizada) => {
    if (err) {
      console.log(`Erro ao atualizar a venda com ID ${id}:`, err);
      res.status(500).send({ message: `Erro ao atualizar a venda com ID ${id}` });
    } else if (!vendaAtualizada) {
      console.log(`Venda com ID ${id} não encontrada`);
      res.status(404).send({ message: `Venda com ID ${id} não encontrada` });
    } else {
      res.status(200).send(vendaAtualizada);
    }
  });
});

// Rota para deletar uma venda pelo ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Venda.findByIdAndDelete(id, (err, vendaDeletada) => {
    if (err) {
      console.log(`Erro ao deletar a venda com ID ${id}:`, err);
      res.status(500).send({ message: `Erro ao deletar a venda com ID ${id}` });
    } else if (!vendaDeletada) {
      console.log(`Venda com ID ${id} não encontrada`);
      res.status(404).send({ message: `Venda com ID ${id} não encontrada` });
    } else {
      res.status(200).send({ message: `Venda com ID ${id} deletada com sucesso` });
    }
  });
});

module.exports = router;
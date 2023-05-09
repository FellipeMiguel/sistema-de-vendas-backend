const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static('client/public'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/index.html'));
});

// Configurando o body-parser e o cors
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Conectando ao banco de dados MongoDB
mongoose.connect('mongodb+srv://fellipemdino:btz85y7i.@dino.rpqpnw6.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso'))
  .catch(err => console.log('Erro ao conectar ao banco de dados:', err));

// Definindo as rotas do sistema
const vendasRoutes = require('./routes/vendas');
const usuariosRoutes = require('./routes/usuarios');

app.use('/vendas', vendasRoutes);
app.use('/usuarios', usuariosRoutes);

// Iniciando o servidor
app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));
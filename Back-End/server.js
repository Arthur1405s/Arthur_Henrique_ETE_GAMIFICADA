// Importa os pacotes
const jwt = require('jsonwebtoken');
const express = require('express');        // Framework para criar servidor
const mongoose = require('mongoose');      // ORM para MongoDB
const cors = require('cors');              // Permite conexões externas
const bcrypt = require('bcryptjs');        // Para criptografar senhas

const app = express();                     // Cria uma aplicação Express
const PORT = 3000;                         // Porta onde o servidor vai rodar

// Middleware: permite JSON e ativa CORS
app.use(express.json());                   // Permite ler JSON no corpo das requisições
app.use(cors());                           // Permite que seu front-end acesse o backend

// Conexão com o MongoDB Atlas 
mongoose.connect('mongodb+srv://ete-gamificada:etegamificada2025@ete-gamificada.vesjfx5.mongodb.net/?retryWrites=true&w=majority&appName=ete-gamificada')
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Importa o modelo do usuário
const Usuario = require('../Back-End/models/usuario');

// Middleware para verificar o token JWT
function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Token não enviado.' });
  }

  const token = authHeader.split(' ')[1]; // Espera "Bearer <token>"

  try {
    const decoded = jwt.verify(token, 'segredoSuperSecreto123'); // mesmo segredo do login
    req.usuario = decoded; // salva os dados no req
    next(); // continua
  } catch (err) {
    return res.status(401).json({ mensagem: 'Token inválido ou expirado.' });
  }
}

// Rota de teste
app.post('/', (req, res) => {
  res.send('API funcionando!');
});

// === ROTA: CADASTRO ===
app.post('/cadastro', async (req, res) => {
  const { nome, email, senha, tipoUsuario } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensagem: 'E-mail já cadastrado.' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = new Usuario({
      nome,
      email,
      senha: senhaCriptografada,
      tipoUsuario,
    });

    await novoUsuario.save();

    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });

  } catch (err) {
    console.error('Erro no cadastro:', err);
    res.status(500).json({ mensagem: 'Erro ao cadastrar usuário.' });
  }
});

// === ROTA: LOGIN ===
app.post('/login', async (req, res) => {
  // Recebe os dados do corpo da requisição
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      console.log('Usuário não encontrado:', email);
      return res.status(400).json({ mensagem: 'Usuário não encontrado.' });
    }

    // Compara senha digitada com a criptografada
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      
      return res.status(401).json({ mensagem: 'Senha incorreta.' });
    }

    // Cria o token JWT com id e tipo do usuário
    const token = jwt.sign(
      { id: usuario._id, tipo: usuario.tipoUsuario }, // payload
      'segredoSuperSecreto123', // segredo para assinar (você pode trocar por algo mais seguro)
      { expiresIn: '1h' } // expira em 1 hora
    );

    // Envia o token no corpo da resposta
    res.status(200).json({
      mensagem: `Bem-vindo, ${usuario.nome}!`,
      token,
      nome: usuario.nome,
      tipo: usuario.tipoUsuario
    });

  } catch (err) {
    res.status(500).json({ mensagem: 'Erro no login.' });
  }
});

// === ROTA PROTEGIDA: PERFIL ===
app.get('/perfil', autenticar, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id);
    if (!usuario) return res.status(404).json({ mensagem: 'Usuário não encontrado' });

    res.json({
      nome: usuario.nome,
      email: usuario.email,
      tipo: usuario.tipoUsuario
    });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar perfil.' });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

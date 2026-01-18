const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5009;

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/agenda')
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch(err => {
    console.log('❌ Erro ao conectar MongoDB:', err.message);
    console.log('💡 Dica: Certifique-se que o MongoDB está rodando');
  });

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, 
    maxAge: 24 * 60 * 60 * 1000, // 1 dia
    httpOnly: true
  }
}));

// Importar rotas
const authRoutes = require('./routes/auth.js');
const contactRoutes = require('./routes/Contacts.js');

// Usar rotas
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

// Route test
// Views
app.set('view engine', 'ejs')
app.set('views', './src/views')
app.get('/api/teste', (req, res) => {
    res.render('index')
})

// Rota de saúde
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Backend funcionando!', 
    timestamp: new Date(),
    database: mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado'
  });
});

// Rota não encontrada
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Middleware de erro
app.use(require('./middlewares/errorHandler.js'));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando na porta ${PORT}`);
  console.log(`📊 MongoDB: ${process.env.MONGODB_URI}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});
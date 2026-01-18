const User = require('../models/User.js');

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Validações
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ error: 'Senha deve ter pelo menos 6 caracteres' });
    }

    // Verificar se usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }
    
    // Criar novo usuário
    const user = new User({ email, password });
    await user.save();
    
    // Salvar sessão
    req.session.userId = user._id;
    
    res.status(201).json({ 
      message: 'Usuário criado com sucesso',
      user: user.toJSON()
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }
    
    // Encontrar usuário
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Credenciais inválidas' });
    }
    
    // Verificar senha
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Credenciais inválidas' });
    }
    
    // Salvar sessão
    req.session.userId = user._id;
    
    res.json({ 
      message: 'Login realizado com sucesso',
      user: user.toJSON()
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao fazer logout' });
    }
    
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout realizado com sucesso' });
  });
};

exports.getUser = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Não autenticado' });
    }
    
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    res.json(user.toJSON());
  } catch (error) {
    next(error);
  }
};

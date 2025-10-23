exports.requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Não autorizado. Faça login.' });
  }
  next();
};

// Middleware opcional para verificar auth (não bloqueia)
exports.optionalAuth = (req, res, next) => {
  res.locals.userId = req.session.userId || null;
  next();
};
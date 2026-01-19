const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

// Rotas públicas
router.post('/register', authController.register);
router.post('/login', authController.login);

// Rotas protegidas
router.post('/logout', authController.logout);
router.get('/user', authController.getUser);

// Route test
router.get('/teste', authController.teste);

module.exports = router;
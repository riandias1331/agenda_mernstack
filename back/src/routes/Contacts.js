const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController.js');
const { requireAuth } = require('../middlewares/auth.js');

// Todas as rotas exigem autenticação
router.use(requireAuth);

router.get('/', contactController.getContacts);
router.post('/', contactController.createContact);
router.put('/:id', contactController.updateContact);
router.delete('/:id', contactController.deleteContact);

module.exports = router;
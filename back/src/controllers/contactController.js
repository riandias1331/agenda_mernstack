const Contact = require('../models/Contact.js');

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ userId: req.session.userId })
      .sort({ createdAt: -1 });
    
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

exports.createContact = async (req, res, next) => {
  try {
    const { name, lastName, email, phone } = req.body;
    
    // Validações
    if (!name || !phone) {
      return res.status(400).json({ error: 'Nome e telefone são obrigatórios' });
    }
    
    if (name.trim().length === 0) {
      return res.status(400).json({ error: 'Nome não pode estar vazio' });
    }
    
    if (phone.trim().length < 8) {
      return res.status(400).json({ error: 'Telefone deve ter pelo menos 8 caracteres' });
    }
    
    const contact = new Contact({
      name: name.trim(),
      lastName: lastName ? lastName.trim() : '',
      email: email ? email.trim().toLowerCase() : '',
      phone: phone.trim(),
      userId: req.session.userId
    });
    
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

exports.updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, lastName, email, phone } = req.body;
    
    // Validações
    if (!name || !phone) {
      return res.status(400).json({ error: 'Nome e telefone são obrigatórios' });
    }
    
    if (name.trim().length === 0) {
      return res.status(400).json({ error: 'Nome não pode estar vazio' });
    }
    
    if (phone.trim().length < 8) {
      return res.status(400).json({ error: 'Telefone deve ter pelo menos 8 caracteres' });
    }
    
    const contact = await Contact.findOneAndUpdate(
      { _id: id, userId: req.session.userId },
      { 
        name: name.trim(),
        lastName: lastName ? lastName.trim() : '',
        email: email ? email.trim().toLowerCase() : '',
        phone: phone.trim()
      },
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({ error: 'Contato não encontrado' });
    }
    
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const contact = await Contact.findOneAndDelete({ 
      _id: id, 
      userId: req.session.userId 
    });
    
    if (!contact) {
      return res.status(404).json({ error: 'Contato não encontrado' });
    }
    
    res.json({ message: 'Contato deletado com sucesso' });
  } catch (error) {
    next(error);
  }
};
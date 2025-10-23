const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 1
  },
  lastName: { 
    type: String, 
    default: '',
    trim: true
  },
  email: { 
    type: String, 
    default: '',
    lowercase: true,
    trim: true
  },
  phone: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 8
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

// Índice para melhor performance
ContactSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Contact', ContactSchema);
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  whatsapp: {
    type: String,
    required: true
  },
  youtube: {
    type: String,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', ContactSchema);
const mongoose = require('mongoose');

const FeatureSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  ordem: {
    type: Number,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Feature', FeatureSchema);
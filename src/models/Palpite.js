const mongoose = require('mongoose');

const PalpiteSchema = new mongoose.Schema({
  grupo: {
    type: String,
    required: [true, 'Por favor adicione um grupo (01-25)'],
    minlength: 2,
    maxlength: 2,
    match: [/^(0[1-9]|1[0-9]|2[0-5])$/, 'Grupo deve ser entre 01 e 25']
  },
  milhar: {
    type: String,
    required: [true, 'Por favor adicione a milhar'],
    trim: true
  },
  centena: {
    type: String,
    required: [true, 'Por favor adicione a centena'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Atualiza o updatedAt quando o documento é modificado
PalpiteSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Palpite', PalpiteSchema);
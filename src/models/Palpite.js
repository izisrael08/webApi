const mongoose = require('mongoose');

const PalpiteSchema = new mongoose.Schema({
  dia: {
    type: String,
    required: true,
    enum: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
  },
  numeros: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v.length === 4;
      },
      message: props => `${props.value} deve conter exatamente 4 números`
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Palpite', PalpiteSchema);
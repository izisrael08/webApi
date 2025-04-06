const mongoose = require('mongoose');

const ResultadoSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true,
    match: [/^\d{2}\/\d{2}\/\d{4}$/, 'Formato de data inválido (DD/MM/YYYY)']
  },
  numeros: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v.length === 3;
      },
      message: props => `${props.value} deve conter número, animal e premiação`
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resultado', ResultadoSchema);
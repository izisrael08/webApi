const mongoose = require('mongoose');

const SlideSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ordem: {
    type: Number,
    required: true,
    unique: true
  },
  active: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Slide', SlideSchema);
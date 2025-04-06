const Resultado = require('../models/Resultado');

// @desc    Get all resultados
// @route   GET /api/resultados
// @access  Public
exports.getResultados = async (req, res, next) => {
  try {
    const resultados = await Resultado.find().sort({ data: -1 });
    res.status(200).json({
      success: true,
      count: resultados.length,
      data: resultados
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Add new resultado
// @route   POST /api/resultados
// @access  Private (Admin)
exports.addResultado = async (req, res, next) => {
  try {
    const resultado = await Resultado.create(req.body);
    res.status(201).json({
      success: true,
      data: resultado
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// @desc    Update resultado
// @route   PUT /api/resultados/:id
// @access  Private (Admin)
exports.updateResultado = async (req, res, next) => {
  try {
    const resultado = await Resultado.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!resultado) {
      return res.status(404).json({
        success: false,
        error: 'Resultado not found'
      });
    }

    res.status(200).json({
      success: true,
      data: resultado
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// @desc    Delete resultado
// @route   DELETE /api/resultados/:id
// @access  Private (Admin)
exports.deleteResultado = async (req, res, next) => {
  try {
    const resultado = await Resultado.findByIdAndDelete(req.params.id);

    if (!resultado) {
      return res.status(404).json({
        success: false,
        error: 'Resultado not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
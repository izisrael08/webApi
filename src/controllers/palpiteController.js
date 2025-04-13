const Palpite = require('../models/Palpite');

// @desc    Get all palpites (ordenados por grupo)
// @route   GET /api/palpites
// @access  Public
exports.getPalpites = async (req, res, next) => {
  try {
    const palpites = await Palpite.find().sort({ grupo: 1 });
    
    res.status(200).json({
      success: true,
      count: palpites.length,
      data: palpites
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor'
    });
  }
};

// @desc    Get single palpite
// @route   GET /api/palpites/:id
// @access  Public
exports.getPalpite = async (req, res, next) => {
  try {
    const palpite = await Palpite.findById(req.params.id);

    if (!palpite) {
      return res.status(404).json({
        success: false,
        error: 'Palpite não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: palpite
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor'
    });
  }
};

// @desc    Add new palpite
// @route   POST /api/palpites
// @access  Private (Admin)
exports.addPalpite = async (req, res, next) => {
  try {
    // Verifica se já existe palpite para este grupo
    const existingPalpite = await Palpite.findOne({ grupo: req.body.grupo });
    if (existingPalpite) {
      return res.status(400).json({
        success: false,
        error: 'Já existe um palpite cadastrado para este grupo'
      });
    }

    const palpite = await Palpite.create(req.body);
    
    res.status(201).json({
      success: true,
      data: palpite
    });
  } catch (err) {
    console.error(err);
    
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Erro no servidor'
      });
    }
  }
};

// @desc    Update palpite
// @route   PUT /api/palpites/:id
// @access  Private (Admin)
exports.updatePalpite = async (req, res, next) => {
  try {
    // Verifica se o grupo está sendo alterado para um que já existe
    if (req.body.grupo) {
      const existingPalpite = await Palpite.findOne({ 
        grupo: req.body.grupo,
        _id: { $ne: req.params.id }
      });
      
      if (existingPalpite) {
        return res.status(400).json({
          success: false,
          error: 'Já existe um palpite cadastrado para este grupo'
        });
      }
    }

    const palpite = await Palpite.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!palpite) {
      return res.status(404).json({
        success: false,
        error: 'Palpite não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: palpite
    });
  } catch (err) {
    console.error(err);
    
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Erro no servidor'
      });
    }
  }
};

// @desc    Delete palpite
// @route   DELETE /api/palpites/:id
// @access  Private (Admin)
exports.deletePalpite = async (req, res, next) => {
  try {
    const palpite = await Palpite.findByIdAndDelete(req.params.id);

    if (!palpite) {
      return res.status(404).json({
        success: false,
        error: 'Palpite não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: 'Erro no servidor'
    });
  }
};
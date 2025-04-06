const Palpite = require('../models/Palpite');

// @desc    Get all palpites
// @route   GET /api/palpites
// @access  Public
exports.getPalpites = async (req, res, next) => {
  try {
    const palpites = await Palpite.find().sort({ dia: 1 });
    res.status(200).json({
      success: true,
      count: palpites.length,
      data: palpites
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Add new palpite
// @route   POST /api/palpites
// @access  Private (Admin)
exports.addPalpite = async (req, res, next) => {
  try {
    const palpite = await Palpite.create(req.body);
    res.status(201).json({
      success: true,
      data: palpite
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

// @desc    Update palpite
// @route   PUT /api/palpites/:id
// @access  Private (Admin)
exports.updatePalpite = async (req, res, next) => {
  try {
    const palpite = await Palpite.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!palpite) {
      return res.status(404).json({
        success: false,
        error: 'Palpite not found'
      });
    }

    res.status(200).json({
      success: true,
      data: palpite
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

// @desc    Delete palpite
// @route   DELETE /api/palpites/:id
// @access  Private (Admin)
exports.deletePalpite = async (req, res, next) => {
  try {
    const palpite = await Palpite.findByIdAndDelete(req.params.id);

    if (!palpite) {
      return res.status(404).json({
        success: false,
        error: 'Palpite not found'
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
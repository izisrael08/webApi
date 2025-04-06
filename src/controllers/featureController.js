const Feature = require('../models/Feature');

// @desc    Get all features
// @route   GET /api/features
// @access  Public
exports.getFeatures = async (req, res, next) => {
  try {
    const features = await Feature.find().sort({ ordem: 1 });
    res.status(200).json({
      success: true,
      count: features.length,
      data: features
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Add new feature
// @route   POST /api/features
// @access  Private (Admin)
exports.addFeature = async (req, res, next) => {
  try {
    const feature = await Feature.create(req.body);
    res.status(201).json({
      success: true,
      data: feature
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Ordem já existe'
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// @desc    Update feature
// @route   PUT /api/features/:id
// @access  Private (Admin)
exports.updateFeature = async (req, res, next) => {
  try {
    const feature = await Feature.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!feature) {
      return res.status(404).json({
        success: false,
        error: 'Feature not found'
      });
    }

    res.status(200).json({
      success: true,
      data: feature
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Ordem já existe'
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// @desc    Delete feature
// @route   DELETE /api/features/:id
// @access  Private (Admin)
exports.deleteFeature = async (req, res, next) => {
  try {
    const feature = await Feature.findByIdAndDelete(req.params.id);

    if (!feature) {
      return res.status(404).json({
        success: false,
        error: 'Feature not found'
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
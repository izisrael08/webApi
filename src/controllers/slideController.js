const Slide = require('../models/Slide');

// @desc    Get all active slides
// @route   GET /api/slides
// @access  Public
exports.getSlides = async (req, res, next) => {
  try {
    const slides = await Slide.find({ active: true }).sort({ ordem: 1 });
    res.status(200).json({
      success: true,
      count: slides.length,
      data: slides
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Add new slide
// @route   POST /api/slides
// @access  Private (Admin)
exports.addSlide = async (req, res, next) => {
  try {
    const slide = await Slide.create(req.body);
    res.status(201).json({
      success: true,
      data: slide
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

// @desc    Update slide
// @route   PUT /api/slides/:id
// @access  Private (Admin)
exports.updateSlide = async (req, res, next) => {
  try {
    const slide = await Slide.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!slide) {
      return res.status(404).json({
        success: false,
        error: 'Slide not found'
      });
    }

    res.status(200).json({
      success: true,
      data: slide
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

// @desc    Delete slide
// @route   DELETE /api/slides/:id
// @access  Private (Admin)
exports.deleteSlide = async (req, res, next) => {
  try {
    const slide = await Slide.findByIdAndDelete(req.params.id);

    if (!slide) {
      return res.status(404).json({
        success: false,
        error: 'Slide not found'
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
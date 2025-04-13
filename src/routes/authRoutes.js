// src/routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User'); // Caminho corrigido

const router = express.Router();

// @desc    Login do usuário
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !email.includes('@')) {
    return next(new ErrorResponse('Email inválido', 400));
  }

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new ErrorResponse('Credenciais inválidas', 401));
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse('Credenciais inválidas', 401));
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      token
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
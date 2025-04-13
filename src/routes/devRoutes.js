// src/routes/devRoutes.js (arquivo novo)
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// @desc    Listar usuários (APENAS PARA DESENVOLVIMENTO)
// @route   GET /api/dev/users
// @access  Public
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('+password'); // Inclui senha
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar usuários'
    });
  }
});

module.exports = router;
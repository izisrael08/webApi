const express = require('express');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

const router = express.Router();

// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Tentativa de login com:', email); // Log para debug

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email e senha são obrigatórios'
    });
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      console.log('Usuário não encontrado:', email);
      return res.status(401).json({
        success: false,
        error: 'Credenciais inválidas'
      });
    }

    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) {
      console.log('Senha incorreta para:', email);
      return res.status(401).json({
        success: false,
        error: 'Credenciais inválidas'
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Login bem-sucedido para:', email);
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor'
    });
  }
});

module.exports = router;
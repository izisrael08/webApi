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

// @route   POST /api/auth/register
router.post('/register', async (req, res) => {
  const { email, password, role = 'user' } = req.body;

  try {
    // Verifica se usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        error: 'Email já cadastrado'
      });
    }

    // Cria o usuário (a senha é criptografada automaticamente pelo pre-save hook)
    const user = await User.create({ email, password, role });

    // Gera token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error("Erro no registro:", err);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor'
    });
  }
});

// @route   PUT /api/auth/update/:id
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { email, password, role } = req.body;

  try {
    // Verifica se o usuário existe
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      });
    }

    // Atualiza apenas os campos fornecidos
    if (email) user.email = email;
    if (password) user.password = password; // Será criptografada automaticamente pelo pre-save hook
    if (role) user.role = role;

    await user.save(); // Dispara o hook de criptografia da senha

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error("Erro na atualização:", err);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor'
    });
  }
});


// Adicione estas rotas antes do module.exports

// @route   GET /api/auth/users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclui a senha da resposta
    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (err) {
    console.error("Erro ao listar usuários:", err);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor'
    });
  }
});

// @route   GET /api/auth/users/:id
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      user
    });

  } catch (err) {
    console.error("Erro ao buscar usuário:", err);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor'
    });
  }
});

// @route   DELETE /api/auth/users/:id
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Usuário removido com sucesso'
    });

  } catch (err) {
    console.error("Erro ao excluir usuário:", err);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor'
    });
  }
});

module.exports = router;
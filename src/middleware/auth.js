// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

exports.protect = async (req, res, next) => {
    let token;

    // Verifica se o token está no header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Se não houver token
    if (!token) {
        return next(new ErrorResponse('Acesso não autorizado', 401));
    }

    try {
        // Verifica o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Adiciona o usuário ao request (simplificado para teste)
        req.user = {
            id: decoded.id,
            role: decoded.role || 'user' // Default para 'user' se não especificado
        };
        
        next();
    } catch (err) {
        return next(new ErrorResponse('Acesso não autorizado', 401));
    }
};

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorResponse(`Acesso negado para função de ${req.user.role}`, 403)
            );
        }
        next();
    };
};
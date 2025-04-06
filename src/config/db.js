// src/config/db.js
require('dotenv').config();  // Adicione isso para carregar as variáveis de ambiente

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.error('Erro de conexão com o MongoDB', error);
        process.exit(1); // Forçar a saída com erro
    }
};

module.exports = connectDB;

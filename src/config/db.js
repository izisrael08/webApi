require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout após 5 segundos
      socketTimeoutMS: 45000 // Fechar conexões ociosas após 45s
    });
    
    console.log('Conectado ao MongoDB');
    
    // Verificação adicional da conexão
    mongoose.connection.on('connected', () => {
      console.log('Mongoose conectado ao DB');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('Erro na conexão do Mongoose:', err);
    });
    
  } catch (error) {
    console.error('Erro de conexão com o MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
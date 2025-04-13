const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./src/config/db');

// Import routes
const palpiteRoutes = require('./src/routes/palpiteRoutes');
const resultadoRoutes = require('./src/routes/resultadoRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
const featureRoutes = require('./src/routes/featureRoutes');
const slideRoutes = require('./src/routes/slideRoutes');
const authRoutes = require('./src/routes/authRoutes');
const devRoutes = require('./src/routes/devRoutes');

// Initialize app
const app = express();

// Connect to Database
connectDB();
// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/palpites', palpiteRoutes);
app.use('/api/resultados', resultadoRoutes);
app.use('/api/contatos', contactRoutes);
app.use('/api/features', featureRoutes);
app.use('/api/slides', slideRoutes);
app.use('/api/dev', devRoutes);


// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'API is running' });
});


  

// Error handling
// Adicione error handling mais detalhado
app.use((error, req, res, next) => {
  console.error("Erro:", error);
  
  res.status(error.status || 500).json({
    success: false,
    error: error.message || 'Erro no servidor',
    // Adicione stack apenas em desenvolvimento
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
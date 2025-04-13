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
const allowedOrigins = [
  'http://localhost:5173',          // Ambiente de desenvolvimento
  'https://webapi-myu4.onrender.com', // Seu próprio backend (se necessário)
  'https://bolao-da-sorte-weld.vercel.app' // Seu frontend no Vercel
];

app.use(cors({
  origin: function (origin, callback) {
    // Permite requests sem origin (como mobile apps ou curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/palpites', palpiteRoutes);
app.use('/api/resultados', resultadoRoutes);
app.use('/api/contatos', contactRoutes);
app.use('/api/features', featureRoutes);
app.use('/api/slides', slideRoutes);
app.use('/api/dev', devRoutes);

// Error handling
app.use((error, req, res, next) => {
  console.error("Erro:", error);
  
  res.status(error.status || 500).json({
    success: false,
    error: error.message || 'Erro no servidor',
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
});

module.exports = app;

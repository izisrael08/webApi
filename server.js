// server.js (ou app.js)
require('dotenv').config(); // Adicione esta linha NO TOPO do arquivo
const app = require('./app');
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
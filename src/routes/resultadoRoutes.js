const express = require('express');
const {
  getResultados,
  addResultado,
  updateResultado,
  deleteResultado
} = require('../controllers/resultadoController');

const router = express.Router();

router
  .route('/')
  .get(getResultados)
  .post(addResultado);

router
  .route('/:id')
  .put(updateResultado)
  .delete(deleteResultado);

module.exports = router;
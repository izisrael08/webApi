const express = require('express');
const {
  getPalpites,
  addPalpite,
  updatePalpite,
  deletePalpite
} = require('../controllers/palpiteController');

const router = express.Router();

router
  .route('/')
  .get(getPalpites)
  .post(addPalpite);

router
  .route('/:id')
  .put(updatePalpite)
  .delete(deletePalpite);

module.exports = router;
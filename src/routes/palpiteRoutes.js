// src/routes/palpiteRoutes.js
const express = require('express');
const { 
  getPalpites, 
  addPalpite, 
  updatePalpite, 
  deletePalpite 
} = require('../controllers/palpiteController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getPalpites)
  .post(protect, authorize('admin'), addPalpite);

router.route('/:id')
  .put(protect, authorize('admin'), updatePalpite)
  .delete(protect, authorize('admin'), deletePalpite);

module.exports = router;
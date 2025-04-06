const express = require('express');
const {
  getSlides,
  addSlide,
  updateSlide,
  deleteSlide
} = require('../controllers/slideController');

const router = express.Router();

router
  .route('/')
  .get(getSlides)
  .post(addSlide);

router
  .route('/:id')
  .put(updateSlide)
  .delete(deleteSlide);

module.exports = router;
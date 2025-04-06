const express = require('express');
const {
  getFeatures,
  addFeature,
  updateFeature,
  deleteFeature
} = require('../controllers/featureController');

const router = express.Router();

router
  .route('/')
  .get(getFeatures)
  .post(addFeature);

router
  .route('/:id')
  .put(updateFeature)
  .delete(deleteFeature);

module.exports = router;
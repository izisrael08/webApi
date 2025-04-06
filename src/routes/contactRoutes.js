const express = require('express');
const {
  getContactInfo,
  updateContactInfo
} = require('../controllers/contactController');

const router = express.Router();

router
  .route('/')
  .get(getContactInfo)
  .put(updateContactInfo);

module.exports = router;
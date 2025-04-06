const Contact = require('../models/Contact');

// @desc    Get contact info
// @route   GET /api/contatos
// @access  Public
exports.getContactInfo = async (req, res, next) => {
  try {
    // There should be only one contact info document
    let contact = await Contact.findOne();

    // If no contact info exists, create default
    if (!contact) {
      contact = await Contact.create({
        whatsapp: 'https://wa.me/SEUNUMERO',
        youtube: 'https://youtube.com/SEUCANAL'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update contact info
// @route   PUT /api/contatos
// @access  Private (Admin)
exports.updateContactInfo = async (req, res, next) => {
  try {
    // There should be only one contact info document
    let contact = await Contact.findOne();

    if (!contact) {
      contact = await Contact.create(req.body);
    } else {
      contact.whatsapp = req.body.whatsapp || contact.whatsapp;
      contact.youtube = req.body.youtube || contact.youtube;
      contact.updatedAt = Date.now();
      await contact.save();
    }
 
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
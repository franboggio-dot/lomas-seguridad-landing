const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { sendAdminNotification } = require('../utils/mailer');

// POST /api/contact - Submit contact form
router.post('/', [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('El correo electrónico no es válido'),
    body('message').notEmpty().withMessage('El mensaje es obligatorio')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        // Save to database
        const newContact = new Contact(req.body);
        await newContact.save();

        // Send email notification to admin
        await sendAdminNotification(req.body);

        res.status(201).json({ 
            success: true, 
            message: 'Tu consulta fue recibida correctamente. Nos comunicaremos pronto.' 
        });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Hubo un error al procesar tu solicitud.' 
        });
    }
});

// GET /api/contact - Get all messages
router.get('/', async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, data: messages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;

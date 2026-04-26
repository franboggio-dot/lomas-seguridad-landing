const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true
    },
    property_type: {
        type: String,
        enum: ['hogar', 'comercio', 'industria', 'otro'],
        default: 'hogar'
    },
    service_interest: {
        type: String,
        required: true
    },
    has_alarm: {
        type: String,
        enum: ['si', 'no', 'nose'],
        default: 'no'
    },
    message: {
        type: String,
        required: [true, 'El mensaje es obligatorio']
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contact', ContactSchema);

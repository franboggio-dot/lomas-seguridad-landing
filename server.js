const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(cors());
app.use(express.json());

// Serve static files from root and specific folders
app.use(express.static(path.join(__dirname)));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Database Connection
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('MongoDB connected successfully'))
        .catch(err => console.error('MongoDB connection error:', err));
} else {
    console.warn('MONGODB_URI not found in environment. Database features will be limited.');
}

// Routes
const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

// Explicit logo route
app.get('/logo.png', (req, res) => {
    res.sendFile(path.join(__dirname, 'LogoLomas.png'));
});

// Root route - serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Admin route
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Algo salió mal en el servidor.',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Vist: http://localhost:${PORT}`);
});

module.exports = app;

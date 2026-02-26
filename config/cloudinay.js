require('dotenv').config();

// Configuración directa verifacadas variables de entornorequire('dotenv').config();

const cloudinary = require('cloudinary').v2;

// Configuración directa con variables verificadas
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

module.exports = cloudinary;


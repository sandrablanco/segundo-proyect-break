require('dotenv').config();

// Configuración directa verifacadas variables de entornorequire('dotenv').config();

const cloudinary = require('cloudinary').v2;

// Configuración directa con variables verificadas
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

// console.log('Configurando Cloudinary con:', {
//   cloud_name: cloudName,
//   api_key: apiKey ? '✓ existe' : '✗ falta',
//   api_secret: apiSecret ? '✓ existe' : '✗ falta'
// });

// Configuración explícita
// cloudinary.config({
//   cloud_name: cloudName,
//   api_key: apiKey,
//   api_secret: apiSecret,
//   secure: true
// });

module.exports = cloudinary;


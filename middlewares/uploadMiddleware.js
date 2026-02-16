const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinay');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'tienda_de_ropa',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 800, height: 800, crop: 'limit' }]
    }
});
const upload = multer({ storage: storage });   
module.exports = upload;
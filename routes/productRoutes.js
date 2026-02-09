const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/create', productController.createProduct);
router.get('/products', productController.showProducts);
router.get('/products/:id',productController.showProductById);

module.exports = router;
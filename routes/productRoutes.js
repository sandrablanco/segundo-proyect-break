const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.post('/create', productController.createProduct);
router.get('/products', productController.showProducts);
router.get('/products/:id',productController.showProductById);




module.exports = router;
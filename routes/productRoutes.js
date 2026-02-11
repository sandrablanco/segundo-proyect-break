const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/create', productController.createProduct);
router.get('/products', productController.showProducts);
router.get('/products/:id',productController.showProductById);
router.get('/dashboard', productController.showDashboard);
router.get('/dashboard/new', productController.showNewProductForm);

module.exports = router;
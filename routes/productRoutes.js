const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
console.log('Funciones en productController:', Object.keys(productController));
console.log('Tipo:', typeof productController);
console.log('¿Es función?', typeof productController.showNewProduct);
console.log('Keys:', Object.keys(productController));
console.log('showNewProduct:', productController.showNewProduct);

router.post('/create', productController.createProduct);
router.get('/products', productController.showProducts);
router.get('/products/:id',productController.showProductById);
router.get('/dashboard', productController.showDashboard);
router.get('/dashboard/new', productController.showNewProduct);

module.exports = router;
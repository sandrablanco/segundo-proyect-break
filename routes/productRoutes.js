const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
// console.log('Funciones en productController:', Object.keys(productController));
// console.log('Tipo:', typeof productController);
// console.log('¿Es función?', typeof productController.showNewProduct);
// console.log('Keys:', Object.keys(productController));
// console.log('showNewProduct:', productController.showNewProduct);

router.post('/create', productController.createProduct);//ruta admin
router.get('/products', productController.showProducts);//ruta publica
router.get('/products/:id',productController.showProductById);//ruta publica 
router.get('/dashboard', productController.showDashboard);//ruta admin
router.get('/dashboard/new', productController.showNewProduct);//ruta admin
router.post('/dashboard', productController.createProduct);
router.get('/dashboard/:productId', productController.showDashboardProduct);
router.get('/dashboard/:productId/edit', productController.showEditProduct);
router.put('/dashboard/:productId', productController.updateProduct);
router.delete('/dashboard/:productId/delete', productController.deleteProduct);


module.exports = router;
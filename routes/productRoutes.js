const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/uploadMiddleware');

//RUTAS PÚBLICAS TIENDA
router.get('/products', productController.showProducts);
router.get('/products/:id', productController.showProductById);

//RUTAS DASHBOARD ADMIN

// Ver dashboard y formularios (sin upload, solo lectura)
router.get('/dashboard', productController.showDashboard); // funciona
router.get('/dashboard/new', productController.showNewProduct);//funciona
// Crear producto (CON upload de imagen) ← AQUÍ VA EL UPLOAD
router.post('/dashboard', upload.single('image'), productController.createProduct);

// Ver detalle y formulario de edición (sin upload, solo lectura)
router.get('/dashboard/:productId', productController.showDashboardProduct); //funciona
router.get('/dashboard/:productId/edit', productController.showEditProduct);//funciona

// Actualizar producto (CON upload de imagen opcional) ← AQUÍ VA EL UPLOAD
router.put('/dashboard/:productId', upload.single('image'), productController.updateProduct);

// Eliminar producto (sin upload)
router.delete('/dashboard/:productId/delete', productController.deleteProduct);

module.exports = router;
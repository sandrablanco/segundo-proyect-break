const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
// router.post('/logout', userController.logout);
router.get('/dashboard', userController.dashboard);


module.exports = router;

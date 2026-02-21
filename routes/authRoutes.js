const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.get('/login', authController.showLogin);
// router.get('/dashboard', userController.dashboard);
router.post('/login', authController.login);
router.get('/logout', authController.logout); 
router.post('/logout', authController.logout); 
// Registro de nuevo usuario
router.get('/register', (req, res) => {
    // Simple página HTML de registro
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Register</title>
        </head>
        <body>
          <h1>Create new user</h1>
          <form action="/register" method="POST">
            <label>Username</label>
            <input type="text" name="username" required placeholder="name"><br>
            <label>Email</label>
            <input type="email" name="email" required placeholder="email"><br>
            <label>Password</label>
            <input type="password" name="password" required placeholder="••••••"><br>
            <button type="submit">Register</button>
          </form>
          <br>
          <a href="/login"><button type="button">I already have an account</button></a>
        </body>
        </html>
    `);
});

// POST para crear usuario
router.post('/register', userController.register);

module.exports = router;
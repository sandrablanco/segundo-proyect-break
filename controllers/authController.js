const User = require('../models/User');

const authController = {
    //get login
    showLogin: async (req, res) => {
        //si usuario logeado redirigir al dashboard
        if (req.session && req.session.user ) {
            return res.redirect('/dashboard');
        }
        let html = `
        <!DOCTYPE html>
        <html>
        <head>
        <title>Login - Admin</title>
        <style>
        </style>
        </head>
        <body>
        <div class="login-box">
          <h1>Login</h1>
          ${req.query.error ? '<p class="error">Invalid username or password</p>' : ''}
           
          <form action="/login" method="POST">
            <label>Username</label>
            <input type="text" name="username" required placeholder="name">
            
            <label>Password</label>
            <input type="password" name="password" required placeholder="•••••••••">
              <button type="submit">Login</button><br></br>
          </form>
            </div>
            <br>
           <button type="button" onclick="window.location.href='/register'">
           Register
           </button>
           <br>
           <p>
           Don't have an account yet?
          <a href="/register">
            <button type="button">Create a new account</button></a>
           </p>
        </body>
        </html>
        `;
        res.send(html);
    },

//post procesamieto de login
login: async (req, res) => {
    try {
        const { username, password } = req.body;
        //buscamos usuario en BD mongo
        const user = await User.findOne({
        username: username.toLowerCase()
        });
        
        if (!user || !password) {
            console.log('User not found', username);
            return res.redirect('/login?error=invalid_credentials');
        }
        //comparar contra
        const match = await user.comparePassword(password);
        if (!match) {
            console.log('Password mismatch for:', username);
            return res.redirect('/login?error=invalid_credentials');
        }
        if (match) {
            req.session.user = {
                username: user.username,
                role: user.role
            };
            console.log('Login successful:', username);
            res.redirect('/dashboard');
        } else { 
            res.redirect('/login?error=invalid_credentials')
            }
         } catch (error) {
            console.error(error);
            res.status(401).send('Unauthorized');

            }
        },
// get logout
logout: async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('logout error');
        }
        res.redirect('/login');
    });
}
};

module.exports = authController;

const User = require('../models/User');

const authController = {
    //get login
   showLogin: async (req, res) => {
    //si usuario logeado redirigir al dashboard
    if (req.session && req.session.userId) { 
        return res.redirect('/products/dashboard');
    }
    
    let html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Login</title>
        <style>
        </style>
    </head>
    <body>
        <div class="login-box">
            <h1>Login</h1>
            ${req.query.error ? '<p class="error">Invalid username or password</p>' : ''}
            
            <form action="/auth/login" method="POST">
                <label>Username</label>
                <input type="text" name="username" required placeholder="name">
                
                <label>Password</label>
                <input type="password" name="password" required placeholder="•••••••••">
                
                <button type="submit">Login</button>
            </form>
            
            <br>
            
            <p>
                Don't have an account yet?
                <a href="/auth/register">
                    <button type="button">Create a new account</button>
                </a>
            </p>
        </div>
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
            return res.redirect('/auth/login?error=invalid_credentials');
        }
        //comparar contraseña
        const match = await user.comparePassword(password);
        if (!match) {
            console.log('Password mismatch for:', username);
            return res.redirect('/auth/login?error=invalid_credentials');
        }
        if (match) { 
            req.session.userId = user._id;
            console.log('Login successful:', username);
            return res.redirect('/products/dashboard');
        } else { 
            res.redirect('auth/login?error=invalid_credentials')
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
        res.redirect('/auth/login');
    });
}
};

module.exports = authController;

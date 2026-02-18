const User = require('../models/User');

const authController = {
    //get login
    showLogin: async (req, res) => {
        //si usuario logeado redirigir al dashboard
        if (req.session. && req.session.user ) {
            return res.redirect('/dashboard');
        }
    }
}

login: async (req, res) => {
    try {
        const { username, password } = req.body;
        //buscamos usuario en BD mongo
        const user = await User.findOne({username: username.toLowerCase});
        if (!user || !password) {
            return res.redirect('/login?error=invalid_credentials')
        }
        const match = await user.comparePassword(password);
        if (match) {
            req.session.user = {
                username: user.username,
                role: user.role
            };
            res.redirect('dashboard');
        } else { 
            res.redirect('/login?error=invalid_credentials')
            }
         } catch (error) {
            console.error(error);
            res.status(401).send('Unauthorized');

            }
        }


const User = require('../models/User');
const userController = {
//para registrar al suario
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Comprobar duplis
      const existsUser = await User.findOne({ username }) ||
      await User.findOne({ email });

      if (existsUser) {
        return res.status(400).send('Username or email already exists');
      }

      // Crear usuario
      const newUser = await User.create({ username, email, password });

      // Guardar usuario en sesión
      req.session.userId = newUser._id;

      return res.redirect('/dashboard');

    } catch (error) {
      console.error(error);
      return res.status(500).send('Server error');
    }
  },

  // redireccion al dashboard
  dashboard: async (req, res) => {
    if (!req.session.userId) {
      return res.redirect('/');
    }

    const user = await User.findById(req.session.userId);

    res.send(`
      <h1>Welcome ${user.username}</h1>
      <form action="/logout" method="POST">
        <button type="submit">Cerrar sesión</button>
      </form>
    `);
  },

  // logout
  logout: (req, res) => {
    req.session.destroy(() => {
      res.redirect('/');
    });
  }

};

module.exports = userController;
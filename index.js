require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session'); 
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;
const dbConnection = require('./config/db');

const authRoutes = require('./routes/authRoutes'); 
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.USER_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true/*desarrollo poner en false*/, maxAge: 24 * 60 * 60 * 1000 } // 24 horas
}));
app.get('/', (req, res) => {
  res.send('API funcionando correctamente 🚀');
});
// Swagger
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./docs");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Montar routers con prefijos
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);

// Conexión a base de datos y levantar servidor
const startServer = async () => {
  try {
    await dbConnection();
    console.log('Database connected successfully');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer(); //evita que se intenten consultas sin conexión

//module.exports = app; //exportamos app para usarlo en los tests
const express = require('express');
const app = express();
const session = require('express-session'); 
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes'); 
const dbConnection = require('./config/db');
const productRoutes = require('./routes/productRoutes');
app.use(express.json());

//config sesiones usuarios
app.use(session(
  {
    secret: process.env.USER_SESSION_SECRET,//cookie q no se pueda manipular 
    resave: false,//no guardar sesion
    saveUninitialized: false,//no crear sesion vacia si el usuario no ha entrado en la sesion
    cookie: {
    secure: false,  // true solo en HTTPS produccion
    maxAge: 24 * 60 * 60 * 1000  // 24 horas lo que dura la sesion
  }
  }));
//middlewares
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
//rutas
app.use("/", productRoutes);
app.use('/', authRoutes);

const startServer = async () => {
  await dbConnection();
  app.listen(PORT, () =>
    console.log(`Server started on port ${PORT}`)
  );
};

startServer(); //evita que se intenten consultas sin conexión

//module.exports = app; //exportamos app para usarlo en los tests
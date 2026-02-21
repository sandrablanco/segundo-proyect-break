const express = require('express');
const app = express();
const session = require('express-session'); 
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;
const dbConnection = require('./config/db');

const authRoutes = require('./routes/authRoutes'); 
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const listEndpoints = require('express-list-endpoints');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.USER_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24*60*60*1000 }//dura 24h
}));

const startServer = async () => {
  await dbConnection();
  console.log('Database connected successfully');

 
  // Montar routers

  app.use('/auth', authRoutes);
  app.use('/products', productRoutes);
  app.use('/users', userRoutes);


  // Lista rutas con prefijos
  
  console.log('RUTAS REGISTRADAS:');
  console.table(listEndpoints(app));

 
  // Iniciamos servidor
  
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

startServer(); //evita que se intenten consultas sin conexión

//module.exports = app; //exportamos app para usarlo en los tests
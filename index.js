const express = require('express');
const app = express();
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const dbConnection = require('./config/db');

const productRoutes = require('./routes/productRoutes');
app.use(express.json());
//middlewares
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.use("/", productRoutes);


const startServer = async () => {
  await dbConnection();
  app.listen(PORT, () =>
    console.log(`Server started on port ${PORT}`)
  );
};

startServer(); //evita que se intenten consultas sin conexión

//module.exports = app; //exportamos app para usarlo en los tests
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const dbConnection = require('./config/db');

const productRoutes = require('./routes/productRoutes');
app.use(express.json());

app.use("/", productRoutes);
//app.use(express.urlencoded({extended:true}));

const startServer = async () => {
  await dbConnection();
  app.listen(PORT, () =>
    console.log(`Server started on port ${PORT}`)
  );
};

startServer(); //evita que se intenten consultas sin conexión

module.exports = app; //exportamos app para usarlo en los tests
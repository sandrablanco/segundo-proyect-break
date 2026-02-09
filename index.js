const express = require('express');
const app = express();
require("dotenv").config();
const productRoutes = require('./routes/productRoutes');
const dbConnection = require('./config/db');
dbConnection();

app.use(express.json());
app.use("/",productRoutes);
//app.use(express.urlencoded({extended:true}));
app.post('/test', (req, res) => {
  res.json({ message: 'Test route works', body: req.body });
});






module.exports = app;
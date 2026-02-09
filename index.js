const express = require('express');
const app = express();
const PORT = 3003;
const mongoose = require('mongoose');
// const swaggerUi = require('swagger-ui-express');

const { dbConnection } = require('./config/db');

dbConnection();

app.use(express.json());

const productRoutes = require('./routes/productRoutes');
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
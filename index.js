const express = require('express');
const app = express();
const PORT = 3003;
const mongoose = require('mongoose');
//const swaggerUi = require('swagger-ui-express');

const { dbConnection } = require('./config/db');
//const routes = require('./routes');
app.use(express.json());

//app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
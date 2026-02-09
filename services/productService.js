const Product = require('../models/Product');

const createProduct = (data) => {
  return Product.create(data);
};

module.exports = {
  createProduct
};
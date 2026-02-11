const productModel = require('../models/Product');

const productController = {

  // CREATE
  createProduct: async (req, res) => {
    try {
      const newProduct = await productModel.create(req.body);
      res.status(201).json({
        message: "Product created",
        data: newProduct
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating product" });
    }
  },

  // READ ALL
  showProducts: async (req, res) => {
    try {
      const products = await productModel.find();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching products" });
    }
  },

  // READ ONE
  showProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await productModel.findById(id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({
        message: "Product found",
        data: product
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }

};
//ADMIN


module.exports = productController;

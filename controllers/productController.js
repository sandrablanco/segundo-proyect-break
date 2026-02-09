const productModel = require('../models/Product');

const productController = {
 createProduct: async (req, res) => {
    try {
      const { title, description, image, category, size, price } = req.body;
      const newProduct = await product.create(req.body);
        res.status(201).json({
        message: "Product created",
        data: product
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating product" });
    }
  },
 showProducts: async (req, res) => {
        const products = await productModel.find();
         } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching products" });
    }
  },
 showProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({ data: product, message: "Product found" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
};

module.exports = productController;


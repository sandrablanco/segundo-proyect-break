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
  },

//ADMIN
//listar productos
showDashboard: async (req, res) => {
  try {
    const products = await productModel.find();
    console.log(products);
    let html = `<h1>Home page</h1>`;
    for (const product of products) {
      html += `<div>
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <img src="${product.image}" width="150">
          <p><strong>${product.price}€</strong></p>
      </div>`;
    }
    res.send(html);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error loading home page" });
  }
},
showNewProduct: async (req, res) => {
  try {
    const fields = [
      {label: "title", name: "title",type: "text"},
      {label: "description", name: "description",type: "text"},
      {label: "image", name: "image",type: "text"}, 
      {label: "category", name: "category",type: "text"},
      {label: "size", name: "size",type: "text"},
      {label: "price", name: "price",type: "number"},
    ];
    let html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>New Product</title>
        </head>
        <body>
          <h1>New Product</h1>
          <form action="/create" method="POST">
            <label>Title</label><br>
            <input type="text" name="title" required><br><br>
            
            <label>Description</label><br>
            <input type="text" name="description" required><br><br>
            
            <label>Image</label><br>
            <input type="text" name="image" required><br><br>
            
            <label>Category</label><br>
            <input type="text" name="category" required><br><br>
            
            <label>Size</label><br>
            <input type="text" name="size" required><br><br>
            
            <label>Price</label><br>
            <input type="number" name="price" required><br><br>
            
            <button type="submit">Create Product</button>
          </form>
        </body>
        </html>
      `;
      res.send(html);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error loading new product form page" });
      
  }
}
};
      
      

module.exports = productController;

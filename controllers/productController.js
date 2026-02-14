const productModel = require('../models/Product');

const productController = {
  // CREATE
  createProduct: async (req, res) => {
    try {
      const newProduct = await productModel.create(req.body);
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating product');
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

  // ADMIN
  // Listar productos
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
  },

  showDashboardProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await productModel.findById(productId);
      
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      let html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${product.title}</title>
        </head>
        <body>
          <a href="/dashboard">Go Home Page</a>
          <h1>${product.title}</h1>
          <img src="${product.image}" width="150">
          <p><strong>Description:</strong> ${product.description}</p>
          <p><strong>Category:</strong> ${product.category}</p>
          <p><strong>Size:</strong> ${product.size}</p>
          <p><strong>Price:</strong> ${product.price}€</p>

          <div>
            <a href="/dashboard/${product._id}/edit">
              <button>Edit Product</button>
            </a>
            <form action="/dashboard/${product._id}/delete?_method=DELETE" method="POST">
              <button type="submit" onclick="return confirm('¿Are you sure you want to delete this product?')">Delete Product</button>
            </form>
          </div>
        </body>
        </html>
      `;
      res.send(html);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error loading product');
    }
  },

  showEditProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await productModel.findById(productId);
      
      if (!product) {
        return res.status(404).send({ error: "Product not found" });
      }
      
      const categories = ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'];
      let optionsCategories = "";
      for (const category of categories) {
        optionsCategories += `<option value="${category}" ${product.category === category ? "selected" : ""}>${category}</option>`;
      } 
      
      const sizes = ['S', 'M', 'L', 'XL'];
      let optionsSizes = "";
      for (const size of sizes) { 
        optionsSizes += `<option value="${size}" ${product.size === size ? "selected" : ""}>${size}</option>`;
      }
      
      let html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Edit Product ${product.title}</title>
        </head>
        <body>
          <a href="/dashboard">Go Home Page</a>
          <h1>Edit Product</h1>
          <form action="/dashboard/${product._id}?_method=PUT" method="POST">
            <label>Title</label><br>
            <input type="text" name="title" value="${product.title}" required><br><br>
            
            <label>Description</label><br>
            <input type="text" name="description" value="${product.description}" required><br><br>
            
            <label>URL Image</label><br>
            <input type="text" name="image" value="${product.image}" required><br><br>
            
            <label>Category</label><br>
            <select name="category" required>
              ${optionsCategories}
            </select><br><br>
            
            <label>Size</label><br>
            <select name="size" required>
              ${optionsSizes} 
            </select><br><br>
            
            <label>Price</label><br>
            <input type="number" name="price" value="${product.price}" required><br><br>
            
            <button type="submit">Submit Changes</button>
          </form>
        </body>
        </html>
      `;
      
      res.send(html);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error loading edit product form');
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const { title, description, image, category, size, price } = req.body;
      await productModel.findByIdAndUpdate(productId, { title, description, image, category, size, price });
      res.redirect(`/dashboard/${productId}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error updating product');
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      await productModel.findByIdAndDelete(productId);
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting product');
    }
  }
};

module.exports = productController;
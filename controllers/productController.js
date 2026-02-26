const productModel = require('../models/Product');

const productController = {
  // CREATE
  createProduct: async (req, res) => {
    try {
      const imageUrl = req.file ? req.file.path : ''; // req.file contiene la info de la imagen subida a Cloudinary
                                                              // req.file.path es la URL de la imagen en Cloudinary
      const newProduct = await productModel.create({
        title: req.body.title,
        description: req.body.description,
        image: imageUrl, // Guardamos la URL de la imagen en el producto la url es automatica en cloudinary
        category: req.body.category,
        size: req.body.size,
        price: req.body.price
      });
      res.redirect('/products/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating product');
    }
  },

  // READ ALL
  showProducts: async (req, res) => {
  try {
    const products = await productModel.find();

    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>All Products</title>
      </head>
      <body>
        <h1>All Products</h1>
        <a href="/products/dashboard">Go Dashboard</a>
    `;

    for (const product of products) {
      html += `
        <div>
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <img src="${product.image}" width="150">
          <p><strong>${product.price}€</strong></p>
          <a href="/products/${product._id}">View Product</a>
        </div>
      `;
    }

    html += `
      </body>
      </html>
    `;

    res.send(html);

  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching products");
  }
},
 
  // READ ONE
  showProductById: async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).send("<h1>Product not found</h1>");
    }

    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${product.title}</title>
      </head>
      <body>
        <a href="/products/products">← Back to all products</a>
        <h1>${product.title}</h1>
        <img src="${product.image}" width="200">
        <p>${product.description}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Size:</strong> ${product.size}</p>
        <p><strong>Price:</strong> ${product.price}€</p>
      </body>
      </html>
    `;

    res.send(html);

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
},
 
  // ADMIN
  // Listar productos
  showDashboard: async (req, res) => {
  if (req.session.userId) {
    return res.redirect('/auth/login');
  }

  try {
    const products = await productModel.find();

    let html = `<h1>Home page</h1>`;
    
     html += `
      <form action="/auth/logout" method="POST">
        <button type="submit">Logout</button>
      </form>
    `;

    for (const product of products) {
      html += `
        <div>
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <img src="${product.image}" width="150">
          <p><strong>${product.price}€</strong></p>
        </div>
      `;
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
        <a href="/products/dashboard">← Back to Home Page</a>
        <h1>New Product</h1>
        <form action="/products/dashboard" method="POST">
          <label>Title</label><br>
          <input type="text" name="title" required><br><br>
          
          <label>Description</label><br>
          <input type="text" name="description" required><br><br>
          
          <label>Upload Image</label><br>
          <input type="file" name="image" accept="image/*" required><br><br>
          
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
          <a href="/products/dashboard">Go Home Page</a>
          <h1>${product.title}</h1>
          <img src="${product.image}" width="150">
          <p><strong>Description:</strong> ${product.description}</p>
          <p><strong>Category:</strong> ${product.category}</p>
          <p><strong>Size:</strong> ${product.size}</p>
          <p><strong>Price:</strong> ${product.price}€</p>

          <div>
            <a href="/products/dashboard/${product._id}/edit">
              <button>Edit Product</button>
            </a>
            <form action="/products/dashboard/${product._id}/delete?_method=DELETE" method="POST">
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
          <a href="/products/dashboard">Go Home Page</a>
          <h1>Edit Product</h1>
            <p>Current Image:</p>
           <img src="${product.image}" width="150" style="border-radius: 8px;"><br><br>
        
        <form action="products/dashboard/${product._id}?_method=PUT" method="POST">
            <label>Title</label><br>
            <input type="text" name="title" value="${product.title}" required><br><br>
            
            <label>Description</label><br>
            <input type="text" name="description" value="${product.description}" required><br><br>
            
            <label>You can change the image</label><br>
            <input type="file" name="image" accept="image/*"><br><br>
           
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
      const updateData = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        size: req.body.size,
        price: req.body.price
      };//si se sube una nueva imagen, actualizamos el campo image con la nueva URL de Cloudinary, si no se sube imagen, mantenemos la URL actual
      if (req.file) {
        updateData.image = req.file.path
      }
      await productModel.findByIdAndUpdate(productId, updateData);
      res.redirect(`/products/dashboard/${productId}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error updating product');
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      await productModel.findByIdAndDelete(productId);
      res.redirect('/products/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting product');
    }
  }
};

module.exports = productController;
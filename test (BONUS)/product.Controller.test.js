const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const Product = require('../models/Product');
const productController = require("../controllers/productController");

describe('createProduct', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await Product.deleteMany() //limpiams productos que hemos creado
    await mongoose.connection.close();
  });
    it('should create a product successfully', async () => {
    const newProduct = {
      title: "Camiseta Blanca",
      description: "Camiseta de algodón",
      image: "",
      category: "Camisetas",
      size: "L",
      price: 24.99
    };
    const response = await request(app)
      .post('/create')
      .send(newProduct);
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Product created");
    expect(response.body.data.title).toBe("Camiseta Blanca");
    });
  });

  describe('getProducts', () => {
      beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

      afterEach(async () => {
    await Product.deleteMany(); 
    await mongoose.connection.close();
  });
    it('should return all products', async () => {
      await Product.create({
        title: "Camiseta amarilla",
        description: "Camiseta de algodón",
        image: "", 
        category: "Camisetas",
        size: "L",
        price: 19.99
      });
      const response = await request(app).get('/products');
      expect(response.statusCode).toBe(200);  
      expect(Array.isArray(response.body)).toBe(true);//comprueba que lo qe me devuelve es array
      expect(response.body.length).toBeGreaterThan(0); //comprueba que la lista tiene al menos un producto
      expect(response.body[0].title).toBe("Camiseta amarilla");//comprueba que el producto creado está en la lista y que el primero es la camista amarilla
    });
  });

  describe('getProductById', () => {
      beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });
      afterAll(async () => {
    await Product.deleteMany(); 
    await mongoose.connection.close();
  });
    it('should return a product by ID', async () => {
      const newProduct = await Product.create({
        title: "Camiseta roja",
        description: "camiseta con elastano y algodón",
        image: "",
        category: "Camisetas",
        size: "S",
        price: 13.99
      });
      const response = await request(app).get(`/products/${newProduct._id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("Product found");
      expect(response.body.data.title).toBe("Camiseta roja");
    });

    it('should return 404 if product not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await request(app).get(`/products/${nonExistentId}`);
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe("Product not found");
    });
  });
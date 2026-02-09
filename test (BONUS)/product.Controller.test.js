const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const Product = require('../models/Product');

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
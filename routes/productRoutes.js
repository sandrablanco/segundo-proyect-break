const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/products', async (req, res) => {
router.get('/products/:id', async (req, res) => {

module.exports = router;
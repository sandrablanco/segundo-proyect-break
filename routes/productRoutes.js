const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/products', async (req, res) => {
    try {
        const product = await Product.find();
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products' });
    }});
router.get('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById();
        if(!product){
        return res.status(404).json({error:"product not found"});
            }
         res.json({data:product,message:"product found"});
    } catch (error) {
         console.error(error);
         res.status(500).json({error:"Server error"});
        };
});



module.exports = router;
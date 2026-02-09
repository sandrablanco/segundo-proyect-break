const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true,
    },
    description:{
        type: String,
        required:true,
    },
    image:{
        type: String,/*url cloudinary*/
        required:true,
    },
    category:{
        type: String,
        required:true,
        enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'],
    },
    size:{
        type: String,
        required:true,
        enum: ['XS', 'S', 'M', 'L', 'XL'],
    },
    price:{
    type: Number,
    required:true,
},
},
{timestamps:true})

module.exports = mongoose.model("Product", ProductSchema, "test" );//guardo en colección test

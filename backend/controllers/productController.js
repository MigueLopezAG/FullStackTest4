const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const Product = require("../models/productModel");

const { v4: uuidv4 } = require("uuid");

const { cloudinary } = require("../cloudinary");

dotenv.config();

// PRODUCT
//PRODUCT CRUD
module.exports.productList = asyncHandler(async (req, res) => {

})

module.exports.createProduct = asyncHandler(async (req, res) => {
    try{
        Product.findOne({name: req.body.name}).then((product) =>{
            if(product){
                return res.status(400).json({name: "Ya existe un producto con este nombre"})
            } else {
                const newProduct = new Product({
                    name: req.body.name,
                    adviserRef: req.body.adviserRef,
                    image: req.body.image,
                    category: req.body.category,
                    description: req.body.description,
                    price: req.body.price,
                    deleted: false
                })
                newProduct.save()
            }
        })
    } catch(err) {
        console.log("Error", err)
        res.status(500).json({message: "Ocurrio un error en el servidor"})
    }
});

module.exports.deleteProduct = asyncHandler(async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        product.deleted = true;
        await product.save();
        res.status(200).json({ message: "Product deleted" });
    } catch(err) {
        console.log("Error", err)
        res.status(500).json({message: "Ocurrio un error en el servidor"})
    }
});

module.exports.editProduct = asyncHandler(async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        product.name = req.body.name
        product.adviserRef = req.body.adviserRef
        product.image = req.body.image
        product.category =  req.body.category
        product.description = req.body.description
        product.price = req.body.price
        await product.save();
        res.status(200).json({ message: "Product updated", product });
    } catch(err) {
        console.log("Error", err)
        res.status(500).json({message: "Ocurrio un error en el servidor"})
    }
});
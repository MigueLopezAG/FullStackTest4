const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const Product = require("../models/productModel");

const { v4: uuidv4 } = require("uuid");

const { cloudinary, storage } = require("../cloudinary");

dotenv.config();

// PRODUCT
//PRODUCT CRUD
module.exports.productList = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({ deleted: false })
        if (products) {
            res.status(200).json({ products });
        } else {
            res.status(400).json({ message: "No se encontraron Productos" });
        }
    } catch (err) {
        console.log("Error", err)
        res.status(500).json({ message: "Ocurrio un error en el servidor" })
    }
})

module.exports.getProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.find({ _id: req.params._id, deleted: false })
        if (product) {
            res.status(200).json({ product });
        } else {
            res.status(400).json({ message: "No se encontro el producto" });
        }
    } catch (err) {
        console.log("Error", err)
        res.status(500).json({ message: "Ocurrio un error en el servidor" })
    }
})

module.exports.createProduct = asyncHandler(async (req, res) => {
    const { productInfo } = req.body
        const product = await Product.findOne({ name: productInfo.name })
            if (product) {
                return res.status(400).json({ name: "Ya existe un producto con este nombre" })
            } else {
                const newProduct = new Product({
                    name: productInfo.name,
                    adviserRef: productInfo.adviserRef,
                    image: {
                        filename:productInfo.imageName,
                        url:''
                    },
                    category: productInfo.category,
                    description: productInfo.description,
                    price: productInfo.price,
                    deleted: false
                })
                try{
                    const uploadResponse = await cloudinary.uploader.upload(productInfo.base64textString, storage)
                    newProduct.image.url = uploadResponse.url;
                    newProduct.save();
                    res.status(200).json({ message: "Product updated", newProduct });
                }catch(err) {
                    console.log("Error", err)
                    res.status(500).json({ message: "Ocurrio un error en el servidor" })
                }
            }
});

module.exports.deleteProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params._id);
        product.deleted = true;
        await product.save();
        res.status(200).json({ message: "Product deleted" });
    } catch (err) {
        console.log("Error", err)
        res.status(500).json({ message: "Ocurrio un error en el servidor" })
    }
});

module.exports.editProduct = asyncHandler(async (req, res) => {
    const {productInfo} = req.body
    console.log("productInfo", productInfo)
    try {
        const product = await Product.findById(req.params._id)
        if (product) {
            product.name = productInfo.name
            product.adviserRef = productInfo.adviserRef
            product.image.filename = productInfo.imageName
            product.category = productInfo.category
            product.description = productInfo.description
            product.price = productInfo.price
            try{
                if(productInfo.base64textString){
                    const uploadResponse = await cloudinary.uploader.upload(productInfo.base64textString, storage)
                    product.image.url = uploadResponse.url;
                }
                product.save();
                res.status(200).json({ message: "Product updated", product });
            }catch(err) {
                console.log("Error", err)
                res.status(500).json({ message: "Ocurrio un error en el servidor" })
            }
        } else {
            res.status(400).json({ message: "No se encontro el Producto" })
        }
    } catch (err) {
        console.log("Error", err)
        return res.status(500).json({ message: "Ocurrio un error en el servidor" })
    }
});
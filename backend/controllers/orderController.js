const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const Order = require("../models/orderModel");

dotenv.config();

// PRODUCT
//PRODUCT CRUD
module.exports.orderList = asyncHandler(async (req, res) => {
    try{
        const orders = await Order.find({productRef: req.body.productRef})
        if(orders){
            res.status(200).json({ orders });
        } else {
            res.status(400).json({message: "No se encontraron Ordenes"});
        }
    } catch(err) {
        console.log("Error", err)
        res.status(500).json({message: "Ocurrio un error en el servidor"})
    }
    
})

module.exports.getOrder = asyncHandler(async (req, res) => {
    try{
        Order.findById(req.params._id).then((order) =>{
            if(order){
                res.status(200).json(order)
            } else {
                res.status(400).json({message: "No se encontro información de la orden"})
            }
        })
    } catch(err) {
        console.log("Error", err)
        res.status(500).json({message: "Ocurrio un error en el servidor"})
    }
})

module.exports.createOrder = asyncHandler(async (req, res) => {
    try{
        const newOrder = new Product({
            productRef: '',
            parcelService: '',
            trackingNumber: ''
        })
        await newOrder.save()
        res.status(200).json({ message: "Order created", newOrder });
    } catch(err) {
        console.log("Error", err)
        res.status(500).json({message: "Ocurrio un error en el servidor"})
    }
});

module.exports.deleteOrder = asyncHandler(async (req, res) => {
    try{
        const order = await Order.findById(req.params.id);
        order.deleted = true;
        await order.save();
        res.status(200).json({ message: "Order deleted" });
    } catch(err) {
        console.log("Error", err)
        res.status(500).json({message: "Ocurrio un error en el servidor"})
    }
});

module.exports.editOrder = asyncHandler(async (req, res) => {
    try{
        const order = await Order.findById(req.params.id);
            order.productRef = '';
            order.orderStatus =  '';
            order.parcelService = '';
            order.trackingNumber = '';
        await order.save();
        res.status(200).json({ message: "Order updated", order });
    } catch(err) {
        console.log("Error", err)
        res.status(500).json({message: "Ocurrio un error en el servidor"})
    }
});
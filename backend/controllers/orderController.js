const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const Order = require("../models/orderModel");
const User = require("../models/userModel");

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
        const newOrder = new Order({
            productRef: req.body.productRef,
            adviserRef: req.body.adviserRef
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
        const order = await Order.findById(req.params._id);
        order.deleted = true;
        await order.save();
        res.status(200).json({ message: "Order deleted" });
    } catch(err) {
        console.log("Error", err)
        res.status(500).json({message: "Ocurrio un error en el servidor"})
    }
});

module.exports.editOrder = asyncHandler((req, res) => {
    const { orderInfo } = req.body;
    try{
        Order.findById(req.params._id).then(order => {
            if(order) {
                order.orderStatus =  orderInfo.orderStatus;
                order.parcelService = orderInfo.parcelService;
                order.trackingNumber = orderInfo.trackingNumber;
                order.save();
                return res.status(200).json({ message: "Order updated", order });
            } else {
                return res.status(400).json({ message: "No se encontro la orden a modificar"})
            }
        });
    }catch(err){
        console.log("Error", err)
        return res.status(500).json({message: "Ocurrio un error en el servidor"})
    }
    
});
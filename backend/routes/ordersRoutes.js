const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin, isAdviser } = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderController");
const multer = require("multer");

//Order Routes
router
  .route("/orderList/:userType")
  .get(orderController.orderList)
  
router
  .route("/")
  .post(orderController.createOrder)

router
  .route("/:_id")
    .get( orderController.getOrder)
    .put( orderController.editOrder)
    .delete(orderController.deleteOrder);
//   .get(isLoggedIn, isAdviser || isAdmin, orderController.orderList)
//   .post(orderController.createOrder)

// router
//   .route("/:id")
//     .get(isLoggedIn, isAdviser || isAdmin, orderController.getOrder)
//     .put(isLoggedIn, isAdviser || isAdmin, orderController.editOrder)
//     .delete(isLoggedIn, isAdmin, orderController.deleteOrder);

module.exports = router;

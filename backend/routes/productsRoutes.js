const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../middleware/authMiddleware");

const productController = require("../controllers/productController");
const multer = require("multer");

// Product Routes
router
  .route("/")
  .get(productController.productList)
  .post(isLoggedIn, isAdmin, productController.createProduct);

router
  .route("/:id")
  //.get(productController.getProdct)
  .put(isLoggedIn, isAdmin, productController.editProduct)
  .delete(isLoggedIn, isAdmin, productController.deleteProduct);

module.exports = router;

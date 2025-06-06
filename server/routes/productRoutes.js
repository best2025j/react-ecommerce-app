// server/routes/productRoutes.js
const express = require("express");
const router = express.Router();
const {
  getProducts,
  createProduct,
} = require("../controllers/productController");
const { protect } = require("../models/middleware/auth");

router.get("/", getProducts);
router.post("/", protect, createProduct);

module.exports = router;

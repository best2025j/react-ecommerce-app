// server/routes/productRoutes.js
const express = require("express");
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const { protect } = require("../models/middleware/auth");


// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin-only routes
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;




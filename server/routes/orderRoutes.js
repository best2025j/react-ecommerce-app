const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  removeFromOrder,
  clearOrder,
} = require("../controllers/orderController");

const { protect } = require("../middleWare/auth");

// Routes
router.post("/", protect, createOrder);   // Create new order
router.get("/", protect, getOrders);     // Get all orders for user
router.delete("/remove/:id", protect, removeFromOrder);    // Remove specific order
router.delete("/clear", protect, clearOrder);    // Clear all orders

module.exports = router;

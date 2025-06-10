const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  removeFromOrder,
  clearOrder,
  getAllOrders,
} = require("../controllers/orderController");

const { protect, admin } = require("../middleWare/auth");

// Routes
router.post("/", protect, createOrder); // Create new order
router.get("/", protect, getOrders); // Get all orders for user
router.delete("/remove/:id", protect, removeFromOrder); // Remove specific order
router.delete("/clear", protect, clearOrder); // Clear all orders
router.get("/admin/all", protect, admin, getAllOrders);

module.exports = router;

const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleWare/admin"); // you create this middleware


const {
  createOrder,
  getOrders,
  removeFromOrder,
  clearOrder,
  getAllOrders,
} = require("../controllers/orderController");

const { protect } = require("../middleWare/auth");

// Routes
router.post("/", protect, createOrder);   // Create new order
router.get("/", protect, getOrders);     // Get all orders for user
router.delete("/remove/:id", protect, removeFromOrder);    // Remove specific order
router.delete("/clear", protect, clearOrder);    // Clear all orders
router.get("/admin/all", protect, isAdmin, getAllOrders);

module.exports = router;
4
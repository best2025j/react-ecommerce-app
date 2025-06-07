// server/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const { createOrder, getOrders } = require("../controllers/orderController");
const { protect } = require("../middleWare/auth");

router.post("/", protect, createOrder);
router.get("/", protect, getOrders);

module.exports = router;

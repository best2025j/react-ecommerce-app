const express = require("express");
const router = express.Router();
const {
  getCart,
  saveCart,
  clearCart,
} = require("../controllers/cartController");
const { protect } = require("../middleWare/auth");

router.get("/", protect, getCart);
router.post("/", protect, saveCart);
router.delete("/clear", protect, clearCart);

module.exports = router;

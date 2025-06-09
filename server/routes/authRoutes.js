// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
} = require("../controllers/authController");
const { protect } = require("../middleWare/auth");

// Public routes
router.post("/register", registerUser); // POST /api/auth/register
router.post("/login", loginUser); // POST /api/auth/login

// Protected routes
router.get("/users", protect, admin, getAllUsers);           // only admin
router.get("/users/:id", protect, getUserById);        // logged in users (add extra check if needed)

module.exports = router;

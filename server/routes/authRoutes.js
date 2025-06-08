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

router.post("/register", registerUser); // POST /api/auth/register

router.post("/login", loginUser); // POST /api/auth/login

router.get("/users", getAllUsers); // GET /api/auth/users

router.get("/users/:id", protect, getUserById); // GET

module.exports = router;

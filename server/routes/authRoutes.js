// server/routes/authRoutes.js
const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);     // POST /api/auth/register → Calls registerUser controller
router.post("/login", loginUser);    // POST /api/auth/login → Calls loginUser controller

module.exports = router;

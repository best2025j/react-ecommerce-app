// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getAllUsers } = require("../controllers/authController");


router.post("/register", registerUser);  // POST /api/auth/register

router.post("/login", loginUser);  // POST /api/auth/login

router.get("/users", getAllUsers); // POST /api/auth/users


module.exports = router;

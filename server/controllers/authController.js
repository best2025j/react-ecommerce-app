// server/controllers/authController.js
const jwt = require("jsonwebtoken");
const User = require("../models/User.js"); // no curly braces here

// generate token
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // adjust path as needed

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// for user registering for the first time
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with hashed password
    const user = await User.create({ name, email, password: hashedPassword });

    // Generate JWT token
    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
      message: "User registered successfully",
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};



// for user alredy registered or already has an account
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  //
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    res.json({ _id: user._id, name: user.name, email: user.email, token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

// Export in CommonJS style
module.exports = { registerUser, loginUser };

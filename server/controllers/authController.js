// server/controllers/authController.js
const jwt = require("jsonwebtoken");
const User = require("../models/User.js"); // no curly braces here

// generate token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// for user registring for the first time
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    //
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res
      .status(201)
      .json({ _id: user._id, name: user.name, email: user.email, token });
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

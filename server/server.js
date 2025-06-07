const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes"); // ✅ import
const productRoutes = require("./routes/productRoutes");

dotenv.config();
connectDB();

// ✅ Correct order
app.use(express.json()); // Parse JSON FIRST

// ✅ Mount the auth routes here
app.use("/api/auth", authRoutes); // Auth routes
app.use("/api/products", productRoutes); // Product routes

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json()); // ✅ parse JSON before routes

app.get("/", (req, res) => res.send("API is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// server/controllers/productController.js
const Product = require("../models/Product");

// description to  Create new product (admin only)

const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      image,
      stock,
      category,
      description,
      rating,
      reviews,
    } = req.body;

    const product = new Product({
      name,
      price,
      image,
      stock,
      category,
      description,
      rating,
      reviews,
      createdBy: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

// description to  Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// description to  Get single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

// description to  Update product (admin only)
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

// description to  Delete product (admin only)
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};

module.exports = {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProducts,
};

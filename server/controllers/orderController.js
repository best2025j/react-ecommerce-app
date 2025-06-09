const Order = require("../models/Order");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const order = await Order.create({ ...req.body, user: req.user._id });
    res.status(201).json(order);
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

// Get orders for the authenticated user
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "products.product"
    );
    res.status(200).json(orders);
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// order for admdin
const getAllOrders = async (req, res) => {
  const orders = await Order.find({})
    .populate("user")
    .populate("products.product");
  res.json(orders);
};

// Remove a specific order by ID
const removeFromOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findOneAndDelete({
      _id: orderId,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order removed successfully" });
  } catch (error) {
    console.error("Remove Order Error:", error);
    res.status(500).json({ message: "Failed to remove order" });
  }
};

// Clear all orders for the authenticated user
const clearOrder = async (req, res) => {
  try {
    await Order.deleteMany({ user: req.user._id });
    res.status(200).json({ message: "All orders cleared" });
  } catch (error) {
    console.error("Clear Orders Error:", error);
    res.status(500).json({ message: "Failed to clear orders" });
  }
};

module.exports = {
  createOrder,
  getOrders,
  removeFromOrder,
  clearOrder,
  getAllOrders,
};

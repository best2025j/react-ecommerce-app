const Cart = require("../models/Cart");


//  to get the cart
const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  );
  res.json(cart || { items: [], totalAmount: 0 });
};


// save cart
const saveCart = async (req, res) => {
  const { items, totalAmount } = req.body;
  const existing = await Cart.findOne({ user: req.user._id });

  if (existing) {
    existing.items = items;
    existing.totalAmount = totalAmount;
    await existing.save();
    return res.json(existing);
  }

  const cart = await Cart.create({ user: req.user._id, items, totalAmount });
  res.status(201).json(cart);
};

const clearCart = async (req, res) => {
  await Cart.deleteOne({ user: req.user._id });
  res.json({ message: "Cart cleared" });
};

module.exports = { getCart, saveCart, clearCart };

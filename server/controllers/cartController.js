const Cart = require("../models/Cart");


// get cart items 
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    res.json(cart || { user: req.user._id, items: [] });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch cart", error: err.message });
  }
};


// add to cart items
const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to add item", error: err.message });
  }
};

//  remove from cart items
const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    await cart.save();
    res.json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to remove item", error: err.message });
  }
};


//  clear cart items
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();
    res.json({ message: "Cart cleared successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to clear cart", error: err.message });
  }
};

module.exports = { getCart, removeFromCart, addToCart, clearCart };

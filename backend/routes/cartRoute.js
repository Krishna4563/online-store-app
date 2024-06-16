const express = require("express");
const Cart = require("../models/cartModel");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { userId, products } = req.body;
    console.log("Received request to add items to cart:", userId, products);

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, products: [], totalAmount: 0 });
    }

    cart.products.push(...products);

    const totalAmount = cart.products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    cart.totalAmount = totalAmount;

    await cart.save();

    console.log("Cart updated successfully:", cart);

    res.status(201).json({ message: "Item/items added to cart successfully!" });
  } catch (error) {
    console.error("Error adding product to cart:", error.message);
    res.status(500).json({ error: "Failed to add items to cart" });
  }
});

router.get("/myCart", async (req, res) => {
  try {
    const cart = await Cart.findOne({});

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json({
      message: "Cart Items",
      cartItems: cart.products,
      totalAmount: cart.totalAmount,
    });
  } catch (error) {
    console.error("Error fetching cart items:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

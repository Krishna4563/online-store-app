const express = require("express");
const { Cart } = require("../models/cartModel");
const Auth = require("../middleware/auth");
const router = express.Router();

router.use(Auth);

router.post("/add", Auth, async (req, res) => {
  try {
    const { products } = req.body;
    const userId = req.user.id;
    console.log(userId);

    const user = await Cart.findOne({ user: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const totalAmount = products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );

    user.cart.products = products;
    user.cart.totalAmount = totalAmount;

    await user.save();

    res.status(201).json({ message: "Item/items added to cart successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/myCart", Auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Cart.findOne({ user: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Cart Items", cartItems: user.cart });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error, can't find cart items");
  }
});

module.exports = router;

const mongoose = require("mongoose");

let Cart;
try {
  Cart = mongoose.model("Cart");
} catch (error) {
  const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    imageUrl: {
      type: String,
    },
  });

  const cartSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      products: [productSchema],
      totalAmount: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    { timestamps: true }
  );

  Cart = mongoose.model("Cart", cartSchema);
}

module.exports = Cart;

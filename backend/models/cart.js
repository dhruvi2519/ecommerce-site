const mongoose = require("mongoose");

// Define cart schema
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Register",
    required: true,
  },
  cartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "cartItems" }],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalItem: {
    type: Number,
    required: true,
    default: 0,
  },
  totalDiscountedPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalDiscount: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create Cart model
const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;

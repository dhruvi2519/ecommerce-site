const mongoose = require("mongoose");
const Decimal128 = require("mongodb").Decimal128;
// Define cart schema
const cartItemsSchema = new mongoose.Schema({
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cart",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  size: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: mongoose.Types.Decimal128,
    required: true,
    default: 0,
  },
  discountedPrice: {
    type: mongoose.Types.Decimal128,
    required: true,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Register",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create Cart model
const CartItems = mongoose.model("cartItems", cartItemsSchema);

module.exports = CartItems;

const mongoose = require("mongoose");

const orderItemsSchema = new mongoose.Schema({
  cartItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cartItems",
    },
  ],

  quantity: {
    type: Number,
  },

  price: {
    type: Number,
  },
  discountedPrice: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Register",
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OrderItem = mongoose.model("OrderItem", orderItemsSchema);

module.exports = OrderItem;

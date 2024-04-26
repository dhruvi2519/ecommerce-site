const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Register",
  },
  orderData: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  orderDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },

  shippingAddress: {
    type: String,
  },

  paymentStatus: {
    type: String,
    default: "pending",
  },

  totalPrice: {
    type: Number,
  },

  totalItem: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

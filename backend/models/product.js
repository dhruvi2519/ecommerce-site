const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  highlights: {
    type: String,
  },
  Details: {
    type: String,
  },
  price: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  discountedPrice: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  discountPersent: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  brand: {
    type: mongoose.Schema.Types.String,
    ref: "Brand",
  },

  colors: [mongoose.Schema.Types.Mixed],
  imageUrl: {
    data: Buffer,
    type: String,
  },
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ratings",
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reviews",
    },
  ],
  numRatings: {
    type: Number,
    default: 0,
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wishlist",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Register",
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const couponSchema = new Schema(
  {
    couponCode: { type: String },
    productId: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Product",
    },
    expiredate: { type: Date },
    totalAmount: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Coupon", couponSchema);

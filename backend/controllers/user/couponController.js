const Coupon = require("../../models/coupon");
const {
  createsCoupon,
  checkCouponsForCartItems,
} = require("../../utils/mongo/coupon");
const { ObjectId } = require("mongodb");

// async function applyCoupon(req, res) {
//   try {
//     const { couponCode, productId, totalAmount } = req.body;
//     const coupon = await Coupon.findOne({ code: couponCode });

//     if (!coupon) {
//       return res.status(404).json({ message: "Coupon not found" });
//     }

//     if (coupon.productId !== productId) {
//       return res
//         .status(400)
//         .json({ message: "Coupon is not valid for this product" });
//     }

//     if (coupon.expiredate < new Date()) {
//       await Coupon.findByIdAndDelete(coupon._id);
//       return res.status(400).json({ message: "Coupon has expired" });
//     }

//     if (totalAmount < 1000) {
//       return res
//         .status(400)
//         .json({ message: "Minimum shopping amount not reached" });
//     }

//     // Coupon is valid
//     return res.status(200).json({ message: "Coupon applied successfully" });
//   } catch (err) {
//     console.error("Error applying coupon:", err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// }

const createCoupon = async (req, res) => {
  try {
    const { couponCode, productId, expiredate, totalAmount } = req.body;
    console.log("code", couponCode);
    console.log("product", productId);
    console.log("expiredate", expiredate);

    // Convert productId to ObjectId format
    const productIdObj = new ObjectId(productId);

    const coupon = await createsCoupon({
      couponCode,
      productId,
      expiredate,
      totalAmount,
    });

    console.log("coupon in controller ", coupon);

    return res
      .status(200)
      .json({ message: "Coupon created successfully", coupon });
  } catch (error) {
    console.error("Error creating coupon:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const checkCoupons = async (req, res) => {
  try {
    const relatedCoupons = await checkCouponsForCartItems();
    console.log("relatedCoupons", relatedCoupons);
    res.status(200).json({ success: true, coupons: relatedCoupons });
  } catch (error) {
    console.error("Error fetching related coupons:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports.checkCoupons = checkCoupons;
module.exports.createCoupon = createCoupon;

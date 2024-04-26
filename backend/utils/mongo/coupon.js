const CartItems = require("../../models/cartItems");
const coupon = require("../../models/coupon");
const CouponModel = require("../../models/coupon");

async function createsCoupon({
  couponCode,
  productId,
  expiredate,
  totalAmount,
}) {
  try {
    console.log("Product data:", productId);
    const coupon = await CouponModel.create({
      couponCode: couponCode,
      productId: productId,
      expiredate: expiredate,
      totalAmount: totalAmount,
    });
    console.log("Coupon created:", coupon);
    return coupon;
  } catch (error) {
    console.error(
      "Server Error in utils/mongo/coupon at createCoupon ==> Error : ",
      error
    );
    throw error;
  }
}

// Assuming you have an endpoint to fetch cart items and coupons
// Here's an example of how you can check for coupons related to the products in the cart on the backend

async function checkCouponsForCartItems() {
  try {
    // Fetch cart items and coupons from the database
    const cartItems = await CartItems.find();
    console.log("Fetched cart items:", cartItems);

    const coupons = await CouponModel.find();
    console.log("Fetched coupons:", coupons);

    // Array to store coupons related to cart items
    const relatedCoupons = [];

    // Check each cart item for related coupons
    for (const cartItem of cartItems) {
      console.log("cartItem.product", cartItem.product);
      const relatedCoupon = coupons.find(
        (coupon) => String(coupon.productId) === String(cartItem.product)
      );
      console.log("Related coupon for cart item:", relatedCoupon);
      console.log(
        "cartItem.productcartItem.productcartItem.productcartItem.productitem:",
        cartItem
      );
      if (relatedCoupon) {
        relatedCoupons.push(relatedCoupon);
      }
    }

    // Log the number of related coupons found
    console.log("Number of related coupons found:", relatedCoupons.length);

    // Return the list of related coupons
    return {
      success: true,
      message: "Related coupons fetched successfully",
      coupons: relatedCoupons,
    };
  } catch (error) {
    // Log and handle any errors
    console.error("Error checking coupons for cart items:", error);
    return {
      success: false,
      error: "Internal server error",
    };
  }
}

module.exports.checkCouponsForCartItems = checkCouponsForCartItems;
module.exports.createsCoupon = createsCoupon;

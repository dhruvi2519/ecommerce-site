const coupon = require("../../models/coupon");
const cartService = require("../../utils/mongo/cartservice");

const findUserCart = async (req, res) => {
  const userId = req.params.id;
  // console.log("PAarams")
  // console.log(req.params)
  console.log("USer-----" + userId);

  try {
    const cart = await cartService.finduserCart(userId);
    console.log("user", userId);
    console.log("cart in controller", cart);

    return res.status(200).send(cart);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const addItemToCart = async (req, res) => {
  const userId = req.body.userId;
  const item = req.body;
  console.log("userIdddddddd", userId);
  console.log("item", item);

  try {
    const addedItem = await cartService.addCartItem(userId, item);
    console.log("addedItem", addedItem);
    return res.status(201).send(addedItem);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const applyCouponController = async (req, res) => {
  try {
    const { couponCode } = req.params; // Coupon code ko request body se extract karein

    console.log("couponCode", couponCode);

    const result = await cartService.applyCouponToCart(couponCode);
    console.log("Result from service", result);
    if (result.success) {
      res
        .status(200)
        .json({ success: true, message: "Coupon applied successfully" });
    } else {
      res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.error("Error applying coupon:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { findUserCart, addItemToCart };
module.exports.applyCouponController = applyCouponController;

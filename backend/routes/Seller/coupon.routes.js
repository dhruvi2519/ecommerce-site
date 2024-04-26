const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/authMiddleware");
const couponController = require("../../controllers/user/couponController");
const cartController = require("../../controllers/user/cartController");
router.post(
  "/create",
  authMiddleware.authenticateUser,
  couponController.createCoupon
);
router.post(
  "/apply/:couponCode",

  cartController.applyCouponController
);

router.get(
  "/related-coupons",

  couponController.checkCoupons
);
module.exports = router;

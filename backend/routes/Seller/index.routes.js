const { Router } = require("express");
const router = Router();

const ProductRouter = require("./product.routes.js");
const CouponRouter = require("./coupon.routes.js");
router.use("/product", ProductRouter);
router.use("/coupon", CouponRouter);
module.exports = router;

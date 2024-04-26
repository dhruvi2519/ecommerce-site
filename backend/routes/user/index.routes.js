const { Router } = require("express");
const router = Router();

const AdminOrderRouter = require("./adminorder.routes.js");
const AdminProductRouter = require("./adminproduct.routes.js");

const AuthRouter = require("./auth.routes");
const UserProductRouter = require("./userproducts.routes.js");
const WishlistRouter = require("./Wishlist.routes.js");

const CartRouter = require("./cart.routes.js");
const CartItemRouter = require("./cartItem.routes.js");

const CategoriesRouter = require("./categories.routes");

const OrderRouter = require("./order.routes.js");

const RatingRouter = require("./rating.routes.js");
const ReviewRouter = require("./review.routes.js");

const UserRouter = require("./auth.routes.js");
const SizeRouter = require("./size.routes.js");
const ColorRouter = require("./color.routes.js");
const BrandRouter = require("./brand.routes.js");

const SellerRouter = require("./seller.routes.js");

router.use("/admin/order", AdminOrderRouter);
router.use("/admin/product", AdminProductRouter);
router.use("/auth", AuthRouter);
router.use("/cart", CartRouter);
router.use("/cartItem", CartItemRouter);
router.use("/categories", CategoriesRouter);
router.use("/order", OrderRouter);
router.use("/rating", RatingRouter);
router.use("/review", ReviewRouter);
router.use("/products", UserProductRouter);
router.use("/userwish", WishlistRouter);
router.use("/user", UserRouter);
router.use("/size", SizeRouter);
router.use("/color", ColorRouter);
router.use("/brand", BrandRouter);
router.use("/seller", SellerRouter);

//user/cart/add-to-cart

module.exports = router;

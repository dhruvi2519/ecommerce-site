const express = require("express");
const router = express.Router();
const {UseraddToWishlist ,UserGetwishlist} = require("../../controllers/user/Wishlist.ctrl")


router.post("/add-to-wishlist/:productId", UseraddToWishlist)
router.get("/wishlist/:userId", UserGetwishlist);
module.exports = router;


const express = require("express");
const router = express.Router();

const cartController = require("../../controllers/user/cartController");
const authMiddleware = require("../../middleware/authMiddleware");

router.get("/:id", cartController.findUserCart);
router.post(
  "/add-to-cart/:productId",
  authMiddleware.authenticateUser,
  cartController.addItemToCart
);

module.exports = router;

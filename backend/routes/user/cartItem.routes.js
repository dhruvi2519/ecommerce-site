const express = require("express");
const router = express.Router();

const cartItemController = require("../../controllers/user/cartItemController");
const authMiddleware = require("../../middleware/authMiddleware");

router.put("/:cartItemId", cartItemController.updateCartItem);
router.delete(
  "/:cartItemId",
  authMiddleware.authenticateUser,
  cartItemController.removeCartItem
);

module.exports = router;

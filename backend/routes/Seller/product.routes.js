const express = require("express");
const router = express.Router();

const orderController = require("../../controllers/user/orderController");
const productController = require("../../controllers/user/productController");
const authMiddleware = require("../../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware.authenticateUser,
  productController.createProduct
);
router.get(
  "/:userId",
  authMiddleware.authenticateUser,
  productController.findProductsByUserId
);

router.get(
  "/orders/:userId",
  authMiddleware.authenticateUser,
  orderController.findOrderByUserIdController
);

router.get(
  "/orders/seller/:userId",
  authMiddleware.authenticateUser,
  orderController.findOrderBySellerIdController
);

module.exports = router;

const express = require("express");
const router = express.Router();

const orderController = require("../../controllers/user/orderController");
const authMiddleware = require("../../middleware/authMiddleware");

router.post("/", authMiddleware.authenticateUser, orderController.createOrder);
router.get(
  "/history/:id",
  authMiddleware.authenticateUser,
  orderController.orderHistory
);
router.get(
  "/:id",
  authMiddleware.authenticateUser,
  orderController.findOrderById
);

module.exports = router;

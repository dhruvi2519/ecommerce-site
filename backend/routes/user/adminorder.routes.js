const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/user/adminOrderController");
const authMiddleware = require("../../middleware/authMiddleware");

router.get("/", orderController.getAllOrders);
router.put(
  "/:orderId/confirmed",

  orderController.confirmedOrders
);
router.put(
  "/:orderId/ship",
  authMiddleware.authenticateUser,
  orderController.shippOrders
);
router.put(
  "/:orderId/deliver",
  authMiddleware.authenticateUser,
  orderController.deliverOrders
);
router.put(
  "/:orderId/cancel",
  authMiddleware.authenticateUser,
  orderController.cancelledOrders
);
router.delete(
  "/delete/:orderId",
  authMiddleware.authenticateUser,
  orderController.deleteOrders
);

module.exports = router;

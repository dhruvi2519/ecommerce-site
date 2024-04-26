const express = require("express");
const router = express.Router();

const productController = require("../../controllers/user/productController");
const authMiddleware = require("../../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware.authenticateUser,
  productController.createProduct
);
router.post(
  "/creates",
  authMiddleware.authenticateUser,
  productController.createMultipleProduct
);
router.delete(
  "/:id",
  authMiddleware.authenticateUser,
  productController.deleteProduct
);
router.put(
  "/:id",
  authMiddleware.authenticateUser,
  productController.updateProduct
);

module.exports = router;

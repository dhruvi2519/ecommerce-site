const express = require("express");
const router = express.Router();

const productController = require("../../controllers/user/productController");
const authMiddleware = require("../../middleware/authMiddleware");

router.get("/", productController.getAllProducts);
router.get("/filter", productController.getAllProductfilter);
router.get("/all", productController.AllProducts);

router.get("/id/:id", productController.findProductById);
router.get("/:searchQuery", productController.searchProductsController);

module.exports = router;

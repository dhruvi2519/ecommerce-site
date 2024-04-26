const express = require("express");

const {
  getBrandById,
  addNewBrand,
  getAllBrandList,
} = require("../../controllers/user/brandController");
const authMiddleware = require("../../middleware/authMiddleware");
const router = express.Router();

router.get("/all", authMiddleware.authenticateUser, getAllBrandList);
router.post("/", authMiddleware.authenticateUser, addNewBrand);
router.get("/:brandId", authMiddleware.authenticateUser, getBrandById);

module.exports = router;

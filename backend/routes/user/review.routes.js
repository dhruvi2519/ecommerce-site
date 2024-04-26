const express = require("express");
const router = express.Router();

const reviewController = require("../../controllers/user/reviewController");
const authMiddleware = require("../../middleware/authMiddleware");

router.post("/create", reviewController.createReview);
router.get("/product/:productId", reviewController.getAllReview);

module.exports = router;

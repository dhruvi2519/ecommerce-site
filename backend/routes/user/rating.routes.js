const express = require("express");
const router = express.Router();

const ratingController = require("../../controllers/user/ratingsController");
const authMiddleware = require("../../middleware/authMiddleware");

router.post("/create", ratingController.createRating);
router.get("/product/:productId", ratingController.getAllRatings);

module.exports = router;

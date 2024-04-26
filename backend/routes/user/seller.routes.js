const express = require("express");
const router = express.Router();
const sellerController = require("../../controllers/user/sellerController");

router.post("/registration", sellerController.registerSeller);
router.post("/login", sellerController.loginUser);
router.get("/", sellerController.getAllSeller);

module.exports = router;

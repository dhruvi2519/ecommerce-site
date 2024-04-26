const express = require("express");

const {
  getAllColorList,
  addNewColor,
  getColorById,
} = require("../../controllers/user/colorController");
const router = express.Router();

router.get("/", getAllColorList);
router.post("/", addNewColor);
router.get("/:colorId", getColorById);

module.exports = router;

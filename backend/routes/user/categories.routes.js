const express = require("express");
const {
  getAllCategoriesList,
  addNewCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} = require("../../controllers/user/categories");
const router = express.Router();

router.get("/", getAllCategoriesList);
router.post("/", addNewCategory);
router.get("/:categoryId", getCategoryById);
router.put("/update/:categoryId", updateCategoryById);
router.delete("/delete/:categoryId", deleteCategoryById);
module.exports = router;

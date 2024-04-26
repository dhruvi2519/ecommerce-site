const Category = require("../../models/category");
const {
  getAllCategories,
  getCategoryByCategoryId,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../../utils/mongo");
const asyncErrorHandler = require("../../middleware/asyncErrorHandler");
const asyncHandler = require("express-async-handler");

const getAllCategoriesList = asyncHandler(async (req, res) => {
  try {
    const categories = await getAllCategories();
    // console.log('categoryList: ', categoryList);

    if (!categories || categories.length === 0) {
      // Check if categoryList is empty
      return res
        .status(400)
        .json({ success: false, message: "No categories found" });
    }

    return res.status(200).json(categories);
  } catch (error) {
    // console.log(error)
    return res.status(500).json({ error: "Internal Server empty Error" });
  }
});

// Get a single category by ID
const getCategoryById = asyncHandler(async (req, res) => {
  try {
    const { name } = req.params;
    const categories = await getCategoryByCategoryId({
      name: name,
    });

    if (!category) {
      res.status(400).json({
        success: false,
        message: "The category with the given ID was not found.",
      });
      return;
    }

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal Server single  Error" });
  }
});

const addNewCategory = asyncHandler(async (req, res) => {
  const { name, parentCategoryId } = req.body;
  console.log("name", name);
  console.log("parentCategoryId", parentCategoryId);
  try {
    let parentCategory = null;

    if (parentCategoryId) {
      parentCategory = await Category.findById(parentCategoryId);
      console.log("parentCategory", parentCategory);

      if (!parentCategory) {
        return res.status(400).json({ error: "Parent category nahi mili" });
      }
    }

    let level = 1;
    if (parentCategory) {
      level = parentCategory.level + 1;
    }

    const category = new Category({ name, parentCategory, level });
    console.log("new Category", category);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error("Category add karne mein error:", error);
    res.status(500).json({ error: "Category add karne mein problem aayi" });
  }
});

const updateCategoryById = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    const updateData = req.body;

    const category = await updateCategory(categoryId, updateData);

    if (!category) {
      res.status(404).json({ success: false, message: "Category not found." });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      category,
    });
  } catch (error) {
    console.error("Error in updating category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const deleteCategoryById = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;

    const deletedCategory = await deleteCategory({ category_id: categoryId });

    if (!deletedCategory) {
      res.status(404).json({ success: false, message: "Category not found." });
      return;
    }

    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully." });
  } catch (error) {
    console.error("Error in deleting category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports.getAllCategoriesList = getAllCategoriesList;
module.exports.getCategoryById = getCategoryById;
module.exports.addNewCategory = addNewCategory;
module.exports.updateCategoryById = updateCategoryById;
module.exports.deleteCategoryById = deleteCategoryById;

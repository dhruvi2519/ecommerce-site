const CategoryModel = require("../../models/category");

async function getAllCategories() {
  try {
    const categories = await CategoryModel.find();
    return categories;
  } catch (error) {
    console.error(
      "Server Error in utils/mongo/categories at getAllCategories ==> Error : ",
      error
    );
  }
}

async function getCategoryByCategoryId({ name }) {
  try {
    const category = await CategoryModel.find({
      /*  _id: category_id */
      name: name,
    });
    return category;
  } catch (error) {
    console.error(
      "Server Error in utils/mongo/categories at getCategoryByCategoryId ==> Error : ",
      error
    );
  }
}

async function createCategory({ name, level }) {
  try {
    const category = await CategoryModel.create({
      name: name,
      level: level,
    });
    return category;
  } catch (error) {
    console.error(
      "Server Error in utils/mongo/categories at createCategory ==> Error : ",
      error
    );
  }
}

async function updateCategory(categoryId, updateData) {
  try {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
      updateData,
      { new: true }
    );

    return updatedCategory;
  } catch (error) {
    console.error(
      "Server Error in utils/mongo/category at updateCategory ==> Error: ",
      error
    );
    throw error;
  }
}

async function deleteCategory({ category_id }) {
  try {
    const deletedCategory = await CategoryModel.findByIdAndDelete(category_id);
    if (!deletedCategory) {
      console.error("Category not found.");
      return null;
    }
    console.log("Category deleted successfully:", deletedCategory);
    return deletedCategory;
  } catch (error) {
    console.error(
      "Server Error in utils/mongo/category at deleteCategory: ",
      error
    );
    throw error;
  }
}

module.exports.getAllCategories = getAllCategories;
module.exports.getCategoryByCategoryId = getCategoryByCategoryId;
module.exports.createCategory = createCategory;
module.exports.updateCategory = updateCategory;
module.exports.deleteCategory = deleteCategory;

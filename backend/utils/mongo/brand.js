const BrandModel = require("../../models/brand");

async function getAllbrand() {
  try {
    const brand = await BrandModel.find();
    return brand;
  } catch (error) {
    console.error(
      "Server Error in utils/mongo/size at getAllbrand ==> Error : ",
      error
    );
  }
}

async function getbrandBybrandId({ brand_id }) {
  try {
    const brand = await BrandModel.findById({
      _id: brand_id,
    });
    return brand;
  } catch (error) {
    console.error(
      "Server Error in utils/mongo/size at getbrandBybrandId ==> Error : ",
      error
    );
  }
}

async function createbrand({ name }) {
  try {
    const brand = await BrandModel.create({
      name: name,
    });
    return brand;
  } catch (error) {
    console.error(
      "Server Error in utils/mongo/size at createbrand ==> Error : ",
      error
    );
  }
}

/* async function deletesize({ category_id }) {
    try {
        const deletedCategory = await CategoryModel.findByIdAndDelete(category_id);
        if (!deletedCategory) {
            console.error("Category not found.");
            return null;
        }
        console.log("Category deleted successfully:", deletedCategory);
        return deletedCategory;
    } catch (error) {
        console.error("Server Error in utils/mongo/category at deleteCategory: ", error);
        throw error;
    }
} */

module.exports.getAllbrand = getAllbrand;
module.exports.getbrandBybrandId = getbrandBybrandId;
module.exports.createbrand = createbrand;
/* module.exports.updateCategory = updateCategory;
module.exports.deleteCategory = deleteCategory; */

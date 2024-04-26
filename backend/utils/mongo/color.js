const ColourModel = require("../../models/color");

async function getAllcolor() {
  try {
    const color = await ColourModel.find();
    return color;
  } catch (error) {
    console.error(
      "Server Error in utils/mongo/size at getAllcolor ==> Error : ",
      error
    );
  }
}

async function getcolorBycolorId({ color_id }) {
  try {
    const color = await ColourModel.findById({
      _id: color_id,
    });
    return color;
  } catch (error) {
    console.error(
      "Server Error in utils/mongo/size at getcolorBycolorId ==> Error : ",
      error
    );
  }
}

async function createcolor({ name }) {
  try {
    const color = await ColourModel.create({
      name: name,
    });
    return color;
  } catch (error) {
    console.error(
      "Server Error in utils/mongo/size at createcolor ==> Error : ",
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

module.exports.getAllcolor = getAllcolor;
module.exports.getcolorBycolorId = getcolorBycolorId;
module.exports.createcolor = createcolor;
/* module.exports.updateCategory = updateCategory;
module.exports.deleteCategory = deleteCategory; */

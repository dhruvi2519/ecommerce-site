const SizeModel = require("../../models/size");

async function getAllsizes() {
  try {
    const size = await SizeModel.find();
    return size;
  } catch (error) {
    console.error(
      "Server Error in utils/mongo/size at getAllSizes ==> Error : ",
      error
    );
  }
}

async function getsizeBysizeId({ category_id }) {
  try {
    const size = await SizeModel.findById({
      _id: size_id,
    });
    return size;
  } catch (error) {
    console.error(
      "Server Error in utils/mongo/size at getsizeBysizeId ==> Error : ",
      error
    );
  }
}

async function createsize({ name }) {
  try {
    const size = await SizeModel.create({
      name: name,
    });
    return size;
  } catch (error) {
    console.error(
      "Server Error in utils/mongo/size at createsize ==> Error : ",
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

module.exports.getAllsizes = getAllsizes;
module.exports.getsizeBysizeId = getsizeBysizeId;
module.exports.createsize = createsize;
/* module.exports.updateCategory = updateCategory;
module.exports.deleteCategory = deleteCategory; */

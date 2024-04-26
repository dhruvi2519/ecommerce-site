const {
  getsizeBysizeId,
  createsize,
  getAllsizes,
} = require("../../utils/mongo");
const asyncErrorHandler = require("../../middleware/asyncErrorHandler");
const asyncHandler = require("express-async-handler");

const getAllSizeList = asyncHandler(async (req, res) => {
  try {
    const sizeList = await getAllsizes();
    // console.log('categoryList: ', categoryList);

    if (!sizeList || sizeList.length === 0) {
      // Check if categoryList is empty
      return res
        .status(400)
        .json({ success: false, message: "No categories found" });
    }

    return res.status(200).json(sizeList);
  } catch (error) {
    // console.log(error)
    return res.status(500).json({ error: "Internal Server empty Error" });
  }
});

// Get a single category by ID
const getSizeById = asyncHandler(async (req, res) => {
  try {
    const { sizeId } = req.params;
    const size = await getsizeBysizeId({
      size_id: sizeId,
    });

    if (!size) {
      res.status(400).json({
        success: false,
        message: "The size with the given ID was not found.",
      });
      return;
    }

    res.status(200).json(size);
  } catch (error) {
    res.status(500).json({ error: "Internal Server single  Error" });
  }
});

const addNewSize = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    const newSize = await createsize({
      name: name,
      // quantity: quantity,
    });

    res.status(201).json(newSize);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports.addNewSize = addNewSize;
module.exports.getSizeById = getSizeById;
module.exports.getAllSizeList = getAllSizeList;

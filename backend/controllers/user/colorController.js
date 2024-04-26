const asyncErrorHandler = require("../../middleware/asyncErrorHandler");
const asyncHandler = require("express-async-handler");
const {
  getAllcolor,
  getcolorBycolorId,
  createcolor,
} = require("../../utils/mongo/color");

const getAllColorList = asyncHandler(async (req, res) => {
  try {
    const colorList = await getAllcolor();

    if (!colorList || colorList.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No color found" });
    }

    return res.status(200).json(colorList);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server empty Error" });
  }
});

// Get a single category by ID
const getColorById = asyncHandler(async (req, res) => {
  try {
    const { colorId } = req.params;
    const color = await getcolorBycolorId({
      color_id: colorId,
    });

    if (!color) {
      res.status(400).json({
        success: false,
        message: "The color with the given ID was not found.",
      });
      return;
    }

    res.status(200).json(size);
  } catch (error) {
    res.status(500).json({ error: "Internal Server single  Error" });
  }
});

const addNewColor = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    const newColor = await createcolor({
      name: name,
    });

    res.status(201).json(newColor);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports.addNewColor = addNewColor;
module.exports.getColorById = getColorById;
module.exports.getAllColorList = getAllColorList;

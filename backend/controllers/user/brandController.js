const asyncErrorHandler = require("../../middleware/asyncErrorHandler");
const asyncHandler = require("express-async-handler");

const {
  getAllbrand,
  getbrandBybrandId,
  createbrand,
} = require("../../utils/mongo/brand");

const getAllBrandList = asyncHandler(async (req, res) => {
  try {
    const brandList = await getAllbrand();

    if (!brandList || brandList.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No brand found" });
    }

    return res.status(200).json(brandList);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server empty Error" });
  }
});

// Get a single category by ID
const getBrandById = asyncHandler(async (req, res) => {
  try {
    const { brandId } = req.params;
    const brand = await getbrandBybrandId({
      brand_id: brandId,
    });

    if (!brand) {
      res.status(400).json({
        success: false,
        message: "The color with the given ID was not found.",
      });
      return;
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: "Internal Server single  Error" });
  }
});

const addNewBrand = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    const newBrand = await createbrand({
      name: name,
    });

    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports.addNewBrand = addNewBrand;
module.exports.getBrandById = getBrandById;
module.exports.getAllBrandList = getAllBrandList;

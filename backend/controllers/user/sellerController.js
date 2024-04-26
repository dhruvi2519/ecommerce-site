// sellerController.js

const asyncHandler = require("express-async-handler");
const Seller = require("../../models/seller");
const jwt = require("jsonwebtoken");
const jwtProvider = require("../../config/jwtToken");
const { getSeller } = require("../../utils/mongo");

const registerSeller = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password, shopname, phoneno } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await Seller.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user
    const newUser = await Seller.create({
      firstname,
      lastname,
      email,
      password,
      shopname,
      phoneno,
    });

    // Generate token
    const token = jwt.sign(
      { userId: newUser._id }, // Use newUser._id for userId
      "mySecretKey", // Change to your actual secret key
      { expiresIn: "3d" }
    );

    res.status(200).json({
      status: "success",
      message: "Seller created",
      token: token,
    });
  } catch (error) {
    console.error("Error registering seller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await Seller.findOne({ email });
  console.log("findUser?._id", findUser?._id.toString());
  if (findUser && (await findUser.isPasswordMatched(password))) {
    data = {
      role: findUser?.role,
      userId: findUser?._id,
      email: findUser?.email,
      fullName: findUser?.firstname + " " + findUser?.lastname,
      token: jwtProvider.generateToken(findUser?._id.toString()),
    };
    res.json({
      code: 200,
      status: true,
      message: "succcess",
      data: data,
    });
  } else {
    throw new Error("Invalid credentials");
  }
});

const getAllSeller = asyncHandler(async (req, res, next) => {
  try {
    const sellerList = await getSeller();

    if (!sellerList || sellerList.length === 0) {
      // Check if sellerList is empty
      return res
        .status(400)
        .json({ success: false, message: "No seller found" });
    }

    // If sellerList is not empty, send it as a response
    return res.status(200).json({ success: true, data: sellerList });
  } catch (error) {
    console.error("Server Error in getAllSeller: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports.registerSeller = registerSeller;
module.exports.loginUser = loginUser;
module.exports.getAllSeller = getAllSeller;

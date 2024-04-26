const asyncErrorHandler = require("../../middleware/asyncErrorHandler");
const port = process.env.PORT || 3000;
const bcrypt = require("bcrypt");
const Register = require("../../models/user");

const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userService = require("../../utils/mongo/user");
const { getAlluser } = require("../../utils/mongo/user");
const jwtProvider = require("../../config/jwtToken");
const { updateUser, deleteUser } = require("../../utils/mongo/user");
const { getUserProfileByToken } = require("../../utils/mongo/user");
const jwtToken = require("../../config/jwtToken");

const register = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;

  // Check if the user already exists
  const existingUser = await Register.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  // Create a new user
  const newUser = await Register.create({
    firstname,
    lastname,
    email,
    password,
    role,
  });

  const token = jwt.sign(
    { userId: newUser._id },
    "mynameisdhruviandmysurnameispatelhelooooo",
    { expiresIn: "48h" }
  );

  res.status(200).json({
    status: "success",
    message: "User created...",
    token: token,
  });
});

const getUserDetails = asyncHandler(async (req, res, next) => {
  try {
    const userList = await getAlluser();

    if (!userList || userList.length === 0) {
      // Check if userList is empty
      return res.status(400).json({ success: false, message: "No user found" });
    }

    // If userList is not empty, send it as a response
    return res.status(200).json({ success: true, data: userList });
  } catch (error) {
    console.error("Server Error in getUserDetails: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await Register.findOne({ email });
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

const getUserById = asyncHandler(async (req, res) => {
  try {
    const userId = req.body.userId;
    console.log("userId in getUserById:", userId);

    const user = await userService.findUserById(userId);
    console.log("User found:", user);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error in getUserById:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("User ID in update controller:", userId);

    const updateData = req.body;
    console.log("Update data in update controller:", updateData);

    // Call the updateUser function to update the user
    const user = await updateUser(userId, updateData);
    console.log("User updated in update controller:", user);

    res
      .status(200)
      .json({ success: true, message: "User updated successfully.", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedUser = await deleteUser({ _id: userId });

    if (!deletedUser) {
      res.status(404).json({ success: false, message: "User not found." });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
      user: deletedUser,
    });
  } catch (error) {
    console.error("Error in deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  // const token = req.headers.authorization;
  const userId = req.params.userId;
  console.log("uset id in controller ", userId);
  try {
    const user = await userService.getUserProfileByToken(userId);
    console.log("hello tokennn", user);

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getUserByAddressController = async (req, res) => {
  console.log("helooo user address controller");
  const userId = req.params.userId;

  console.log("userId address", userId);
  try {
    const address = await userService.findUserByAddress(userId);
    console.log("addresssssss", address);

    return res.status(200).send(address);
  } catch (error) {
    console.error("Error in getAddressByUserIdController:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
};

const createUserAddressController = async (req, res) => {
  try {
    const address = await userService.createAddress(req.body);
    console.log("address controller", address);
    res.status(201).send(address);
  } catch (error) {
    console.error("Error creating address:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

exports.getAllAddresses = async (req, res) => {
  try {
    const addresses = await userService.getAlladdress.find();
    console.log("address controller get all  ", addresses);
    res.status(200).json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.register = register;
module.exports.loginUser = loginUser;
module.exports.getUserDetails = getUserDetails;
module.exports.getUserById = getUserById;
module.exports.updateUserById = updateUserById;
module.exports.deleteUserById = deleteUserById;
module.exports.getUserProfileByToken = getUserProfileByToken;
module.exports.getUserProfile = getUserProfile;
module.exports.getUserByAddressController = getUserByAddressController;
module.exports.createUserAddressController = createUserAddressController;

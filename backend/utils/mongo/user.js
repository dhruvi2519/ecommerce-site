const userModel = require("../../models/user");
const Register = require("../../models/user");
const Address = require("../../models/address");
const jwtToken = require("../../config/jwtToken");

async function getAlluser() {
  try {
    const user = await userModel.find();
    return user;
  } catch (error) {
    console.error(
      "Server Error in utils/mongo/categories at getAlluser ==> Error : ",
      error
    );
  }
}
async function findUserById(userId) {
  try {
    console.log("User ID:", userId);

    const user = await Register.findById(userId);
    console.log("User found:", user);

    if (!user) {
      return { success: false, message: "User not found" };
    }

    return { success: true, user };
  } catch (error) {
    console.error("Server Error in utils/mongo/user at findUserById:", error);
    throw { success: false, error };
  }
}

async function getUserByUserEmail({ email }) {
  try {
    const user = await Register.findById(email); //.populate("address");
    return user;
  } catch (error) {
    console.error(
      "Server Error in utils/mongo/user at getUserByUserEmail==> Error : ",
      error
    );
  }
}

async function updateUser(userId, updateData) {
  try {
    console.log("userID in update function", userId);
    console.log("updateData in update function", updateData);

    const user = await Register.findByIdAndUpdate(userId, updateData, {
      new: true, // To return the updated document
    });

    console.log("User updated:", user);
    return { success: true, user };
  } catch (error) {
    console.error("Error updating user:", error);
    throw { success: false, error };
  }
}

async function deleteUser(userId) {
  try {
    const deletedUser = await Register.findByIdAndDelete(userId);
    if (!deletedUser) {
      console.error("User not found.");
      return null;
    }
    console.log("User deleted successfully:", deletedUser);
    return deletedUser;
  } catch (error) {
    console.error(
      "Server Error in utils/mongo/user at deleteUser ==> Error: ",
      error
    );
    throw error;
  }
}

const getUserProfileByToken = async (userId) => {
  try {
    // const userId = jwtToken.getUserIdFromToken(token);

    console.log("userId in function", userId);

    const user = await findUserById(userId);
    console.log("hellooo token user", user);

    return user;
  } catch (error) {
    console.error("Error in getUserProfileByToken:", error.message);
    throw new Error("Failed to get user profile by token: " + error.message);
  }
};

const createUser = async (userData) => {
  try {
    let { firstname, lastname, email, password, role } = userData;

    const isUserExist = await Register.findOne({ email });

    if (isUserExist) {
      throw new Error("Email already exists", email);
    }
    password = await bcrypt.hash(password, 10);

    const user = await Register.create({
      firstname,
      lastname,
      email,
      password,
      role,
    });

    console.log("created user", user);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

async function findUserByAddress(user) {
  console.log("hello address function");
  try {
    console.log("user_id", user);
    const userAddress = await Address.find({
      user: user,
    });
    console.log("Heyeddcdf", userAddress);

    return userAddress;
  } catch (error) {
    console.error(
      "Server Error in utils/mongo/user at getAddressByUserId ==> Error : ",
      error
    );
    throw error;
  }
}

async function createAddress(reqData) {
  try {
    const address = new Address({
      firstname: reqData.firstname,
      lastname: reqData.lastname,
      streetAddress: reqData.streetAddress,
      city: reqData.city,
      state: reqData.state,
      zipCode: reqData.zipCode,
      mobile: reqData.mobile,
      user: reqData.user,
    });

    console.log("created address", address);

    return await address.save();
  } catch (error) {
    console.log("error in function in create address", error);
    throw new Error(error.message);
  }
}

async function getAlladdress() {
  try {
    const user = await Address.find();
    console.log("address function ", user);
    return user;
  } catch (error) {
    console.error(
      "Server Error in utils/mongo/categories at getAlluser ==> Error : ",
      error
    );
  }
}

module.exports.getAlluser = getAlluser;
module.exports.findUserById = findUserById;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getUserProfileByToken = getUserProfileByToken;
module.exports.getUserByUserEmail = getUserByUserEmail;
module.exports.findUserByAddress = findUserByAddress;
module.exports.createAddress = createAddress;
module.exports.getAlladdress = getAlladdress;

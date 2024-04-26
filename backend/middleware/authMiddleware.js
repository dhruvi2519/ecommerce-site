const jwt = require("jsonwebtoken");
const jwtToken = require("../config/jwtToken");
const Register = require("../models/user");
const { asyncErrorHandler } = require("./asyncErrorHandler");

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Token not found in authenticateUser" });
    }
    const userId = jwtToken.getUserIdFromToken(token);
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorizeddd in authenticateUser" });
    }
    // console.log("userId in authenticateUser", userId);
    const user = await Register.find({ _id: userId });
    // console.log("user in authenticateUser ", user);
    req.user = user;
    if (!user) {
      return res
        .status(401)
        .json({ error: "Unauthorizedddd in authenticateUser" });
    }

    next();
  } catch (error) {
    console.error("Authentication error in authenticateUser:", error);
    return res.status(401).json({ error });
  }
};

const restrict = (req, res, next, role) => {
  console.log("req.body", req.body);
  console.log("Role in restrict middleware:", role);

  if (!role.includes(req.user.role)) {
    const error = new Error("YOU CAN NOT ACCESS THIS ACTION");
    console.log("error in restrict", error);
    return res.status(403).json({ error: "YOU CAN NOT ACCESS THIS ACTION" });
  }

  next();
};

module.exports = {
  authenticateUser,
  restrict,
};

const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user/userController");
const authMiddleware = require("../../middleware/authMiddleware");
router.get("/alluser", userController.getUserDetails);
router.post("/registration", userController.register);
router.post("/login", userController.loginUser);
router.get("/user/:id", userController.getUserById);
router.put("/update/:userId", userController.updateUserById);
router.delete("/delete/:userId", userController.deleteUserById);
router.get("/profile/:userId", userController.getUserProfile);
router.get("/address/:userId", userController.getUserByAddressController);
router.post("/address", userController.createUserAddressController);
router.get(
  "/address",
  authMiddleware.authenticateUser,
  userController.getUserByAddressController
);
module.exports = router;

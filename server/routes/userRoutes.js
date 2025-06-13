const express = require("express");
const {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser); // Register a new user

router.route("/login").post(authUser); // Authenticate user login

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;

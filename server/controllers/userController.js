const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  console.log("api  triggred");
  const {
    username,
    email,
    password,
    education,
    stream,
    graduationCourse,
    postGraduationCourse,
    phdCourse,
  } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create new user
  const user = await User.create({
    username,
    email,
    password,
    education,
    stream,
    graduationCourse,
    postGraduationCourse,
    phdCourse,
  });

  console.log(user);
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
    console.log("user created successfully");
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// controllers/userController.js
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      username: user.username,
      education: user.education,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// controllers/userController.js
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.education = req.body.education || user.education;
    user.stream = req.body.stream || "";
    user.graduationCourse = req.body.graduationCourse || "";
    user.postGraduationCourse = req.body.postGraduationCourse || "";
    user.phdCourse = req.body.phdCourse || "";

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { registerUser, authUser, getUserProfile, updateUserProfile };

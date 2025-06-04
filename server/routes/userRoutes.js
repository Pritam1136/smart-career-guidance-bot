const express = require("express");
const { registerUser, authUser } = require("../controllers/userController");

const router = express.Router();

router.route("/").post(registerUser); // Register a new user

router.route("/login").post(authUser); // Authenticate user login

module.exports = router;

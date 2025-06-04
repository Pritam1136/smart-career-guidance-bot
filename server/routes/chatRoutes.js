const express = require("express");
const { createChat, getUserChats } = require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create or fetch a chat between student and AI
router.route("/").post(protect, createChat);

// Get all chats for a student (use query param or auth token)
router.route("/").get(protect, getUserChats);

module.exports = router;

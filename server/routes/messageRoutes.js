const express = require("express");
const {
  addMessage,
  getChatMessages,
} = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addMessage);

router.get("/:chatId", protect, getChatMessages);

module.exports = router;

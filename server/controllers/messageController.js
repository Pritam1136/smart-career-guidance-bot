const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");

// Add a message to a chat (student or AI)
const addMessage = asyncHandler(async (req, res) => {
  const userId = req.user._id; // from auth middleware
  const { chatId, content } = req.body;

  if (!chatId || !content) {
    res.status(400);
    throw new Error("chatId and content are required");
  }

  // Save student message
  const newMessage = await Message.create({
    chat: chatId,
    sender: "student",
    content,
  });

  // For now, dummy AI reply after student message
  const aiReply = await Message.create({
    chat: chatId,
    sender: "ai",
    content: "This is a dummy reply from the bot.",
  });

  // Respond with both messages (student + AI reply)
  res.status(201).json([newMessage, aiReply]);
});

// Get all messages for a chat
const getChatMessages = asyncHandler(async (req, res) => {
  const chatId = req.params.chatId;

  if (!chatId) {
    res.status(400);
    throw new Error("chatId param is required");
  }

  const messages = await Message.find({ chat: chatId }).sort({ createdAt: 1 });

  res.json(messages);
});

module.exports = { addMessage, getChatMessages };

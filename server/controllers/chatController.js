const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");


const createChat = asyncHandler(async (req, res) => {
  const userId = req.user._id; // consistent user id

  const { title } = req.body;

  const newChat = await Chat.create({
    student: userId,
    title: title || "New Chat",
  });

  res.status(201).json(newChat);
});

const getUserChats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const chats = await Chat.find({ student: userId }).sort({ updatedAt: -1 });
  res.json(chats);
});


module.exports = {
  createChat,
  getUserChats,
};

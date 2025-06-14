const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

require("dotenv").config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 60,
  responseMimeType: "text/plain",
};

// Add a message to a chat (student or AI)
const addMessage = asyncHandler(async (req, res) => {
  const userId = req.user._id;
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

  // Check if it's the first message in this chat
  const messageCount = await Message.countDocuments({ chat: chatId });
  if (messageCount === 1) {
    let title = content.trim();
    if (title.length > 8) {
      title = title.slice(0, 8).trim() + "...";
    }
    await Chat.findByIdAndUpdate(chatId, { title });
  }

  // Generate AI response
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(
    `${content}. Please respond in plain text (no markdown) and limit the response to 50 words. Only answer if the question is strictly academic in nature. If not, reply with: "Sorry, I can only respond to academic questions."`
  );

  const aiText = await result.response.text();

  const aiReply = await Message.create({
    chat: chatId,
    sender: "ai",
    content: aiText,
  });

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

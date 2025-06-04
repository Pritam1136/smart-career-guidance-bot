const express = require("express");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const LoginLog = require("../models/loginLogModal"); // You’ll create this model
const router = express.Router();

// Get admin summary
router.get("/summary", async (req, res) => {
  try {
    const users = await User.find({});
    const totalUsers = users.length;

    const userSummaries = await Promise.all(
      users.map(async (user) => {
        const chats = await Chat.find({ student: user._id });
        const logins = await LoginLog.find({ user: user._id });

        return {
          userId: user._id,
          email: user.email,
          chatCount: chats.length,
          loginLogs: logins.map((log) => ({
            date: log.date,
            duration: log.duration,
          })),
        };
      })
    );

    res.json({ totalUsers, userSummaries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch admin summary" });
  }
});

module.exports = router;

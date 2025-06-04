const mongoose = require("mongoose");

const loginLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: String,
  duration: Number, // in minutes or seconds
});

module.exports = mongoose.model("LoginLog", loginLogSchema);
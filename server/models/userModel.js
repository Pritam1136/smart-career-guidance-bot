const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    education: {
      class12: { type: Boolean, default: false },
      graduate: { type: Boolean, default: false },
      postGraduate: { type: Boolean, default: false },
      phd: { type: Boolean, default: false },
    },

    stream: { type: String, default: "" }, // Only if class12
    graduationCourse: { type: String, default: "" }, // Only if graduate
    postGraduationCourse: { type: String, default: "" }, // Only if postGraduate
    phdCourse: { type: String, default: "" }, // Only if phd

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Optional: hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;

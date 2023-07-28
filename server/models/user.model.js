const mongoose = require("mongoose");
const phonePattern = /^\+9940?(40|5[015]|60|7[07])\d{7}$/;

const userSchema = new mongoose.Schema({
  fullName: { type: String, trim: true, required: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  phoneNumber: { type: String, required: true, validate: phonePattern },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
  token: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Token",
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);

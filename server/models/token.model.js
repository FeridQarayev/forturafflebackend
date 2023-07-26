const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    token: { type: String, default: null },
    isReset: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  });
  
  module.exports = mongoose.model("Token", tokenSchema);
  
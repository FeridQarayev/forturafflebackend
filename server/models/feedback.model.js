const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  message: { type: String, required: true },
  sendedAt: { type: Date, default: new Date() },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Feedback", feedbackSchema);

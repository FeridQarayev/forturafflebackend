const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  //   productIds: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Token",
  //     default: null,
  //   },
});

module.exports = mongoose.model("Category", categorySchema);

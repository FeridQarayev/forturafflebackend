const mongoose = require("mongoose");

const productImageSchema = new mongoose.Schema({
  path: { type: String, required: true },
  isMain: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model("ProductImage", productImageSchema);

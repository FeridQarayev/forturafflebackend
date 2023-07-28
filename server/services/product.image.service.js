const mongoose = require("mongoose");

const productImageSchema = new mongoose.Schema({
  path: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model("ProductImage", productImageSchema);

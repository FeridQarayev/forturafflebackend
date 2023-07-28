const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: new Date() },
  isActive: { type: Boolean, default: false },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  ticketCount: { type: Number, required: true },
  ticketPrice: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  productImages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductImage",
      default: null,
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);

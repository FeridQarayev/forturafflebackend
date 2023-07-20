const mongoose = require("mongoose");
const phonePattern = /^\+9940?(40|5[015]|60|7[07])\d{7}$/;

const contactSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    validate: phonePattern,
  },
  email: { type: String, default: null, unique: false },
  instagram: { type: String, default: null },
  facebook: { type: String, default: null },
  twitter: { type: String, default: null },
  threads: { type: String, default: null },
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Contact", contactSchema);

const mongoose = require("mongoose");

const subscribedSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
});

module.exports = mongoose.model("Subscribed", subscribedSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  otp: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);

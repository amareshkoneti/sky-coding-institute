// models/Registration.js
const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  registeredAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Registration", registrationSchema);

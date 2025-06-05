// routes/api.js
const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const Registration = require("../models/Registration");
const verifyToken = require('../middleware/authMiddleware');
const User = require('../models/User');  // Adjust path as needed

// GET /api/courses - get all courses
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching courses." });
  }
});

// POST /api/register - register for a course
router.post("/register", async (req, res) => {
  const { name, email, phone, courseId, } = req.body;

  if (!name || !email || !phone || !courseId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Optional: Validate course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    // Check if user already registered for the course (optional)
    const existingReg = await Registration.findOne({ email, courseId });
    if (existingReg) {
      return res.status(400).json({ message: "You have already registered for this course." });
    }

    // Save registration
    const registration = new Registration({ name, email, phone, courseId });
    await registration.save();

    res.json({ message: "Registration successful." });
  } catch (error) {
    res.status(500).json({ message: "Server error during registration." });
  }
});

router.get('/registrations', async (req, res) => {
  try {
    const email = req.query.email;  // or req.body.email depending on request
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find registrations by user id
    const registrations = await Registration.find({ email: email }).populate('courseId');
    console.log(registrations)
    res.json(registrations);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

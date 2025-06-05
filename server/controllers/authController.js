const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendOTP } = require("../utils/sendEmail");

exports.signup = async (req, res) => {
  console.log(req.body);

  const { name, email, phone, password, dob, address } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      dob,
      address,
      otp
    });

    await user.save();

    await sendOTP(email, otp);
    res
      .status(201)
      .json({ msg: "Signup successful. Check your email for OTP." });
  } catch (err) {
    await User.deleteOne({ email }); // optional cleanup
    res.status(500).json({ msg: "Error during signup", error: err });
  }
};


exports.verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp) return res.status(400).json({ msg: "Invalid OTP" });

    user.isVerified = true;
    user.otp = null;
    await user.save();

    res.status(200).json({ msg: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error during verification", error: err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });
    if (!user.isVerified) return res.status(401).json({ msg: "Email not verified" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email,phone:user.phone,dob:user.dob } });
  } catch (err) {
    res.status(500).json({ msg: "Login error", error: err });
  }
};
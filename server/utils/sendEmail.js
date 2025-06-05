const nodemailer = require("nodemailer");

exports.sendOTP = async (email, otp) => {
  console.log("Sending OTP to:", email, "with OTP:", otp)
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: '"Coaching Center" <amareshkoneti@gmail.com>',
    to: email,
    subject: "Email Verification Code",
    text: `Your verification code is: ${otp}`,
  });
};
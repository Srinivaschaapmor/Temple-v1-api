// import crypto from "crypto";
// import { saveOtp, getOtp, deleteOtp } from "../models/otpModels.js";

// export const generateAndSendOtp = async (phoneNumber) => {
//   const otp = generateOtp();
//   // Save OTP to the database with the phone number
//   await saveOtp(phoneNumber, otp);
//   // Here, you would integrate with an SMS service to send the OTP
//   // For this example, we will just return the OTP in the response
//   return { phone_number: phoneNumber, otp: otp };
// };

// export const verifyOtp = async (phoneNumber, otp) => {
//   const savedOtp = await getOtp(phoneNumber);
//   if (savedOtp && savedOtp === otp) {
//     // Optionally, delete the OTP after verification
//     await deleteOtp(phoneNumber);
//     return true;
//   }
//   return false;
// };

// function generateOtp() {
//   return crypto.randomInt(100000, 999999).toString();
// }
import crypto from "crypto";
import nodemailer from "nodemailer";
import { saveOtp, getOtp, deleteOtp } from "../models/otpModels.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
const JWT_SECRET = "HS256";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testdavose@gmail.com",
    pass: "kbxs rqcp zccw dwmt",
  },
});

export const generateAndSendOtp = async (email) => {
  const otp = generateOtp();
  await saveOtp(email, otp);

  // Save email to the User collection
  await saveUserEmail(email);

  const mailOptions = {
    from: "testdavose@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  await transporter.sendMail(mailOptions);
  return { email: email, otp: otp }; // Optionally, remove otp from the response in production
};

export const verifyOtp = async (email, otp) => {
  const savedOtp = await getOtp(email);
  if (savedOtp && savedOtp === otp) {
    await deleteOtp(email);

    // Create JWT token
    const token = jwt.sign({ email: email }, JWT_SECRET, { expiresIn: "1h" });
    return { token: token };
  }
  return { error: "Invalid OTP" };
};

const saveUserEmail = async (email) => {
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const user = new User({ email });
      await user.save();
    }
  } catch (error) {
    throw new Error("Error saving user email: " + error.message);
  }
};

function generateOtp() {
  return crypto.randomInt(100000, 999999).toString();
}

import { generateAndSendOtp, verifyOtp } from "../services/otpService.js";

export const sendOtp = async (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const otpDetails = await generateAndSendOtp(email);
    res.status(200).json(otpDetails);
  } catch (error) {
    res.status(500).json({ error: "Error sending OTP: " + error.message });
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required" });
  }

  try {
    const result = await verifyOtp(email, otp);
    if (result.token) {
      res
        .status(200)
        .json({ message: "OTP verified successfully", token: result.token });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Error verifying OTP: " + error.message });
  }
};

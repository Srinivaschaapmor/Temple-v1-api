import express from "express";
import { sendOtp, verifyOTP } from "../controller/otpController.js";

const router = express.Router();

router.post("/send_otp", sendOtp);
router.post("/verify_otp", verifyOTP);

export default router;

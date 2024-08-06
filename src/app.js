import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import otpRoutes from "./routes/otpRoutes.js";
const app = express();

// Middleware setup
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/otp", otpRoutes);

export { app };

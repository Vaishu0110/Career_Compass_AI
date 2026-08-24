// api/index.js (Self-Contained Vercel Serverless Function Handler)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import atsRoutes from "../server/routes/atsRoutes.js";
import authRoutes from "../server/routes/authRoutes.js";
import resumeRoutes from "../server/routes/resumeRoutes.js";
import skillGapRoutes from "../server/routes/skillGapRoutes.js";
import aiResumeRoutes from "../server/routes/aiResumeRoutes.js";
import roadmapRoutes from "../server/routes/roadmapRoutes.js";
import jobRoutes from "../server/routes/jobRoutes.js";
import dashboardRoutes from "../server/routes/dashboardRoutes.js";
import resumeGeneratorRoutes from "../server/routes/resumeGeneratorRoutes.js";
import profileRoutes from "../server/routes/profileRoutes.js";
import interviewRoutes from "../server/routes/interviewRoutes.js";
import careerCoachRoutes from "../server/routes/careerCoachRoutes.js";
import jobRecommendationRoutes from "../server/routes/jobRecommendationRoutes.js";
import resumeHistoryRoutes from "../server/routes/resumeHistoryRoutes.js";
import generatedResumeRoutes from "../server/routes/generatedResumeRoutes.js";
import interviewHistoryRoutes from "../server/routes/interviewHistoryRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());

// Serverless DB Connection Handler with Fast Timeout & Disabled Buffering
let isConnected = false;
const connectDB = async () => {
  if (isConnected || mongoose.connections[0]?.readyState === 1) {
    isConnected = true;
    return;
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing on Vercel Settings!");
  }
  
  mongoose.set("bufferCommands", false);

  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  });
  isConnected = true;
};

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB Connect Error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Database Connection Error: " + err.message,
    });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Career Compass API is live on Vercel!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/career-coach", careerCoachRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/learning-roadmap", roadmapRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/ats", atsRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/ai", aiResumeRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/skill-gap", skillGapRoutes);
app.use("/api/resume-generator", resumeGeneratorRoutes);
app.use("/api/job-recommendations", jobRecommendationRoutes);
app.use("/api/resume-history", resumeHistoryRoutes);
app.use("/api/generated-resume", generatedResumeRoutes);
app.use("/api/interview-history", interviewHistoryRoutes);

app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;

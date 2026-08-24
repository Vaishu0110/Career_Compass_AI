import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";

import atsRoutes from "./routes/atsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import skillGapRoutes from "./routes/skillGapRoutes.js";
import aiResumeRoutes from "./routes/aiResumeRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import resumeGeneratorRoutes from "./routes/resumeGeneratorRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import careerCoachRoutes from "./routes/careerCoachRoutes.js";
import jobRecommendationRoutes from "./routes/jobRecommendationRoutes.js";
import resumeHistoryRoutes from "./routes/resumeHistoryRoutes.js";
import generatedResumeRoutes from "./routes/generatedResumeRoutes.js";
import interviewHistoryRoutes from "./routes/interviewHistoryRoutes.js";

dotenv.config();

const app = express();

// Safe directory initialization for Vercel /tmp environment
const uploadsDir = path.join("/tmp", "uploads");
const profileUploadsDir = path.join(uploadsDir, "profile");
try {
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
  if (!fs.existsSync(profileUploadsDir)) fs.mkdirSync(profileUploadsDir, { recursive: true });
} catch (e) {
  console.warn("FS notice:", e.message);
}

// ✅ CORS Middleware
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());
app.use("/uploads", express.static(uploadsDir));

// ✅ Serverless MongoDB Connection Cache
let isConnected = false;
const connectDB = async () => {
  if (isConnected || mongoose.connections[0].readyState) {
    isConnected = true;
    return;
  }
  if (process.env.MONGO_URI) {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
  }
};

app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.error("MongoDB Connect Error:", err);
  }
  next();
});

app.get("/", (req, res) => {
  res.send("API Running...");
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

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});


if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
}

// ✅ Export app for Vercel Serverless environment
export default app;
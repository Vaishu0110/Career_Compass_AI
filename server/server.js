import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
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
import resumeHistoryRoutes from "./routes/resumeHistoryRoutes.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/career-coach", careerCoachRoutes);
app.use("/api/interview",interviewRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/ats", atsRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/ai", aiResumeRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/skill-gap", skillGapRoutes);
app.use( "/api/resume-generator", resumeGeneratorRoutes );
app.use("/api/job-recommendations", jobRecommendationRoutes);
app.use("/api/resume-history", resumeHistoryRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
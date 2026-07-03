import express from "express";
import multer from "multer";
import { extractTextFromPDF } from "../services/resumeParser.js";
import { analyzeResumeWithAI } from "../services/aiService.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Upload + AI Analysis Route
router.post(
  "/upload",
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No resume uploaded",
        });
      }

      // Extract text from PDF
      const resumeText = await extractTextFromPDF(
        req.file.path
      );

      console.log("Resume Text Extracted");

      const aiResult = await analyzeResumeWithAI(
        resumeText
      );

      const cleanedResult = aiResult
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const analysis = JSON.parse(cleanedResult);

      res.json({
        success: true,
        analysis,
      });

    } catch (error) {
      console.error("Resume Analysis Error:", error);

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

export default router;
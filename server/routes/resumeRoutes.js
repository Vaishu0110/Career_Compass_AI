import express from "express";
import multer from "multer";
import Resume from "../models/Resume.js";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";
import { extractTextFromPDF } from "../services/parsers/resumeParser.js";
import { analyzeResumeWithAI } from "../services/ai/resumeAI.js";

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


router.get("/", protect, async (req, res)=> {
  try{
    const resumes = await Resume.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post(
  "/upload", protect,
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

      await Resume.create({
        user:req.user._id,

        originalName: req.file.originalname,

        fileUrl: req.file.filename,

        fileSize: req.file.size,

        atsScore: analysis.atsScore || 0,

        resumeScore: analysis.resumeScore || 0,

        analysis,
      });

      await User.findByIdAndUpdate(
        req.user._id,
        {
          $inc: {
            resumeCount: 1,
          },
        }
      );

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

router.delete("/:id", protect, async (req, res) => {
  try{
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({message: "Resume Not Found."});
    }
    await Resume.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(req.user._id,{
      $inc: {
        resumeCount: -1,
      },
    }
  );

  res.json({success:true,});
  } catch (error) {
    res.status(500).json({ message: error.message,});
  }
});

export default router;
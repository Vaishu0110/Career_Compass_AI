import express from "express";
import { generateResumeWithAI } from "../services/resumeGeneratorAI.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate", protect, async (req, res) => {
  try {
    const { fullName, targetRole, skills, projects,} = req.body;

    if (
        !fullName?.trim() ||
        !targetRole?.trim() ||
        !skills ||
        !projects
        ) {
        return res.status(400).json({
          success: false,
            message: "Full name, target role, skills and projects are required.",
        });
    }

    const resume = await generateResumeWithAI(req.body);

    res.json({
      success: true,
      resume,
    });

  } catch (error) {

    console.error("Resume generation error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
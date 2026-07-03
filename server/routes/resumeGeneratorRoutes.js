import express from "express";
import { generateResumeWithAI } from "../services/resumeGeneratorAI.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    if (
        !req.body.fullName ||
        !req.body.skills ||
        !req.body.projects
        ) {
        return res.status(400).json({
            message: "Please fill required fields"
        });
    }
    const resume = await generateResumeWithAI(req.body);

    res.json({
      success: true,
      resume,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
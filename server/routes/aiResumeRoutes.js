import express from "express";
import { analyzeResumeWithAI } from "../services/ai/resumeAI.js";

const router = express.Router();

router.post("/analyze", async (req ,res)=> {
    try{
        const { resumeText } = req.body;
        const result = await analyzeResumeWithAI(resumeText);

        const cleanedResult = result.replace(/```json/g, "").replace(/```/g, "").trim();

        res.json({
        analysis: JSON.parse(cleanedResult),
        });
    } catch (error) 
    {
        console.error(error);
        res.status(500).json({
            message: error.message,
        });
    }
});

export default router;
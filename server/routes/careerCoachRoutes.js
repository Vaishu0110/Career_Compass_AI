import express from "express";
import { askCareerCoach } from "../services/careerCoachAI.js";

const router = express.Router();
router.post("/ask", async (req, res)=> {
    try {
        const { question, history } = req.body;
        if(!question) {
            return res.status(400).json({
                success: false,
                message: "Question is Required",
            });
        }
        const response = await askCareerCoach(question, history);

        res.json({
            success: true,
            response,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message:"Career Coach AI failed",
        });
    }
});

export default router;

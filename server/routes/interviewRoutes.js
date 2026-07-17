import express from "express";
import { generateQuestions } from "../services/ai/interviewAI.js";
import {evaluateInterview} from "../services/interviewEvaluationAI.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/questions",protect, async (req, res) => {
    try {
        const {role, difficulity = "Intermediate"} = req.body;

        if(!role){
            return res.status(400).json({
                success: false,
                message: "Role is required"
            });
        }

        const result = await generateQuestions(role, difficulity);

        res.json({
            success: true,
            result,
        });
    }
    catch(error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed"
        });
    }
});

router.post("/evaluate",protect, async(req,res) => {
    try {

        if(!role || !qa) {
            return res.status(400).json({
                success: false,
                message: "Role and answers are required"
            });
        }

        const {role, difficulity, qa} = req.body;
        const result = await evaluateInterview(role, qa);
        res.json({
            success: true,
            result
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Evaluation failed"
        });
    }
});

export default router;
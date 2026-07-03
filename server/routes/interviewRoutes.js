import express from "express";
import { generateQuestion } from "../services/interviewAI.js";
import {evaluateInterview} from ".../services/interviewEvaluationAI.js";

const router = express.Router();

router.post("/questions", async (req, res) => {
    try {
        const {role} = req.body;
        const result = await generateQuestions(role);

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

router.post("/evaluate", async(req,res) => {
    try {
        const {role, qa} = req.body;
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
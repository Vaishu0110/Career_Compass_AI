import express from "express";
import { generateQuestions } from "../services/ai/interviewAI.js";
import {evaluateInterview} from "../services/interviewEvaluationAI.js";
import { protect } from "../middleware/authMiddleware.js";
import InterviewSession from "../models/InterviewSession.js";

const router = express.Router();

router.post("/questions",protect, async (req, res) => {
    try {
        const {role, difficulty = "Intermediate"} = req.body;

        if(!role || !role.trim()){
            return res.status(400).json({
                success: false,
                message: "Role is required"
            });
        }

        const result = await generateQuestions(role.trim(), difficulty);

        res.json({
            success: true,
            questions: result.questions || [],
        });
    }
    catch(error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to generate interview questions.",
        });
    }
});

router.post("/evaluate", protect, async(req,res) => {
    try {
        console.log("Evaluation request body:", req.body);

        const {role, difficulty= "Intermediate", qa} = req.body;

        if(!role || !role.trim()){
            return res.status(400).json({
                success:false,
                message: "Role is required",
            });
        }
        if(!qa) {
            return res.status(400).json({
                success: false,
                message: "Answers are required.",
            });
        }

        const result = await evaluateInterview(role.trim(), qa);

        console.log("AI evaluation result:", result);

        const interview = await InterviewSession.create({

            user: req.user._id,
            role,
            difficulty,

            questions: result.questions || [],

            overallScore: result.overallScore || 0,

            strengths: result.strengths || [],

            weaknesses: result.weaknesses || [],

            suggestions: result.suggestions || [],

        });

        console.log("Interview session saved:", interview._id);

        res.json({
            success: true,
            result: {
                overallScore: result.overallScore || 0,

                strengths: result.strengths || [],

                weaknesses: result.weaknesses || [],

                suggestions: result.suggestions || [],
            },
        });

    } catch (error) {
        console.error("Interview evaluation error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

router.get("/history", protect, async (req, res) => {
    try{
        const interviews = await InterviewSession.find({
            user: req.user._id,
        }).sort({
            createdAt: -1,
        });

        res.json({
            success: true,
            interviews,
        });
    } catch (error) {
        console.error("Interview history error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch interview history.",
        });
    }
});

export default router;
import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import User from "../models/User.js";
import Resume from "../models/Resume.js";
import JobRecommendation from "../models/JobRecommendation.js";

import { generateJobRecommendations } from "../services/ai/jobRecommendationAI.js";

const router = express.Router();

router.get("/",protect, async (req, res)=>{
    try{
        const user = await User.findById(req.user._id);
        
        const latestResume = await Resume.findOne({
            user: req.user._id,
        }).sort({
            createdAt: -1,
        });
        
        if(!latestResume){
            return res.status(404).json({
                message: "Please analyze a resume first.",
            });
        }
        
        const result = await generateJobRecommendations(
            user,
            latestResume.analysis
        );

        await JobRecommendation.findOneAndUpdate(
            {
                user: req.user._id,
            },
            {
                user: req.user._id,
                recommendations: result.jobs,
            },
            {
                upsert: true,
                new: true,
            }
        );

        res.json(result);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

export default router;
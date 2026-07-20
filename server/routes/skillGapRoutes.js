import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { analyzeSkillGap } from "../services/skillGapAI.js";

const router = express.Router();

router.post("/analyze", protect, async(req,res)=> {
    try{
        const {skills, targetRole} = req.body;

        const result = await analyzeSkillGap(skills, targetRole);
        res.json({success:true, result,});
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Skill Gap Analsis Failed",
        });
    }
});

const { skills, targetRole } =req.body;

if(!skills || !targetRole) {
    return res.status(400).json({
        success: false,
        message: "Skills and Target Role are required.",
    });
}

export default router;
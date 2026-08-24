import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { analyzeSkillGap } from "../services/skillGapAI.js";
import SkillGap from "../models/SkillGap.js";

const router = express.Router();

router.post("/analyze", protect, async(req,res)=> {
    try{
        const {skills, targetRole} = req.body;

        const cleanSkills = skills?.trim();
        const cleanTargetRole = targetRole?.trim();

        if(!cleanSkills || !cleanTargetRole) {
            return res.status(400).json({
                success: false,
                message: "Skills and Target Role are required.",
            });
        }
        const result = await analyzeSkillGap(cleanSkills, cleanTargetRole);

        const skillGap = await SkillGap.create({
            user: req.user._id,
            targetRole: cleanTargetRole,
            currentSkills: skills,
            missingSkills: result.missingSkills || [],
            roadmap: result.roadmap || [],
            estimatedTime: result.estimatedTime || "Unknown",
        });

        res.json({success:true, result, skillGapId: skillGap._id});

    } catch (error) {

        console.error("Skill Gap Analysis Error:", error);
        
        res.status(500).json({
            success: false,
            message: "Skill Gap Analysis Failed",
        });
    }
});

router.get("/history", protect, async (req, res) => {
    try{
        const history = await SkillGap.find({
            user: req.user._id,
        }).sort({
            createdAt: -1,
        });

        res.json({ success: true, history, });

    } catch (error) {
        console.error("Skill Gap History Error:", error);

        res.status(500).json({
            success:false,
            message: "Failed to fetch skill gap history",
        });
    }
});

router.get("/latest", protect, async (req, res)=> {
    try{
        const latest = await SkillGap.findOne({
            user: req.user._id,
        }).sort({
            createdAt: -1,
        });

        res.json({ success:true, skillGap: latest,});

    } catch (error) {
        console.error("Latest Skill Gap Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch latest skill gap",
        });
    }
});


export default router;
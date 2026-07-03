import express from "express";
import { analyzeSkillGap } from "../services/skillGapAI.js";

const router = express.Router();

router.post("/analyze", async(req,res)=> {
    try{
        const {skills, targetRole} = req.body;

        const result = await analyzeSkillGap(skills, targetRole);
        res.json({success:true, result,});
    } catch (error) {
        console.error(error);
        res.status(500).json({
            succes: false,
            message: "Skill Gap Analsis Failed",
        });
    }
});

export default router;
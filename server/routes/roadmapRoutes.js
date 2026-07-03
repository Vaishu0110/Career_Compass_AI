import express from "express";
import { generateRoadmap } from "../services/roadmapAI.js";

const router = express.Router();

router.post("/generate", async(req, res)=>{
    try {
        const { targetRole }=req.body;
        const result= await generateRoadmap(targetRole);
        res.json({
            success: true,
            result,
        });
    } catch (error) {
        consolr.error(error);
        res.status(500).json({
            success: false,
            message:"Roadmap generation Failed",
        });
    }
});

export default router;
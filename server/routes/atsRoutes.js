import express from "express";
import { analyzeATS } from "../services/atsService.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/check", protect, async(req,res)=>{
    try{
        const { resumeText ,jobDescription }=req.body;
        const result = await analyzeATS (resumeText, jobDescription);
        res.json({
            success:true,
            result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message:"ATS Analysis Failed",
        });
    }
});

export default router;
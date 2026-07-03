import express from "express";
import { analyzeATS } from "../services/atsService.js";

const router = express.Router();

router.post("/check",async(req,res)=>{
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
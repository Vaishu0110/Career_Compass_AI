import express from "express";
import User from "../models/User.js";
import Job from "../models/Job.js";
import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
    try{
        const jobs = await Job.find({
            user: req.user._id,
        });

        const applied = jobs.filter(job => job.status === "Applied").length;
        
        const interview= jobs.filter(job => job.status ==="Interview").length;

        const offer = jobs.filter(job => job.status ==="Offer").length;

        const rejected = jobs.filter(job => job.status === "Rejected").length;

        const user = await User.findById(req.user._id);
        res.json({
            name: user.name,
            targetRole: user.targetRole,

            resumeScore: 88,
            atsScore: 82,
            
            resumeCount:user.resumeCount,
            analysesCount:user.analysisCount,

            learningProgress: 45,
            skillGap: 6,

            applied,
            interview,
            offer,
            rejected,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

export default router;
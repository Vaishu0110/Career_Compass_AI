import express, { application } from "express";
import User from "../models/User.js";
import Job from "../models/Job.js";
import Resume from "../models/Resume.js"
import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
    try{
        const user = await User.findById(req.user._id);

        const latestResume = await Resume.findOne({
            user: req.user._id,
        }).sort({
            createdAt: -1,
        });

        const jobs = await Job.find({
            user:req.user._id,
        });

        const applied = jobs.filter(job => job.status === "Applied").length;
        
        const interview= jobs.filter(job => job.status ==="Interview").length;

        const offer = jobs.filter(job => job.status ==="Offer").length;

        const rejected = jobs.filter(job => job.status === "Rejected").length;

        res.json({
            name: user.name,
            targetRole: user.targetRole,

            resumeScore: latestResume?.resumeScore || 0,
            atsScore: latestResume?.atsScore || 0,
            
            resumeCount: await Resume.countDocuments({
                user: req.user._id,
            }),

            applications: jobs.length,

            interview: interview,
            
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
import express, { application } from "express";
import User from "../models/User.js";
import Job from "../models/Job.js";
import Resume from "../models/Resume.js"
import { protect } from "../middleware/authMiddleware.js";
import Interview from "../models/Interview.js";
import SkillGap from "../models/SkillGap.js";
import LearningRoadmap from "../models/LearningRoadmap.js";

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
        
        const interviewCount= jobs.filter(job => job.status ==="Interview").length;

        const offer = jobs.filter(job => job.status ==="Offer").length;

        const rejected = jobs.filter(job => job.status === "Rejected").length;

        const latestInterview = await Interview.findOne({
            user:req.user._id,
        }).sort({ createdAt: -1 });

        const latestRoadmap = await LearningRoadmap.findOne({
            user: req.user._id,
        }).sort({ createdAt: -1});

        const latestSkillGap = await SkillGap.findOne({
            user: req.user._id,
        }).sort({ createdAt: -1});

        let learningProgress = 0;

        if(!latestRoadmap?.roadmap?.length) {

            const total = latestRoadmap.roadmap.length;

            const completed = latestRoadmap.roadmap.filter(step => step.completed).length;

            learningProgress = Math.round((completed / total) * 100);

            const missingSkills = latestSkillGap?.missingSkills?.length || 0;
        }

        res.json({
            name: user.name,
            targetRole: user.targetRole,

            resumeScore: latestResume?.resumeScore || 0,
            atsScore: latestResume?.atsScore || 0,
            
            resumeCount: await Resume.countDocuments({
                user: req.user._id,
            }),

            applications: jobs.length,

            interviewScore:latestInterview?.overallScore || 0,

            learningProgress,

            skillGap: missingSkills,

            interview: interviewCount,
            
            analysesCount:user.analysisCount,

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
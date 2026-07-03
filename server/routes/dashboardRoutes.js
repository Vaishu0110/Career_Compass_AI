import express from "express";
import Job from "../models/Job.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const jobs = await Job.find();

        const applied = jobs.filter(job => job.status === "Applied").length;
        
        const interview= jobs.filter(job => job.status ==="Interview").length;

        const offer = jobs.filter(job => job.status ==="Offer").length;

        const rejected = jobs.filter(job => job.status === "Rejected").length;

        res.json({
            resumeScore: 88,
            atsScore: 82,
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
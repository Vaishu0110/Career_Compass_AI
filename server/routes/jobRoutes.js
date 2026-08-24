import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Job from "../models/Job.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
    try {
        const jobs = await Job.find({
            user: req.user._id,

        }).sort({
            createdAt: -1,
        });

        res.json(jobs);
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});

router.post("/save", protect, async(req, res) => {
    try{
        const {
            title,
            company,
            location,
            salary,
            jobUrl,
            matchScore,
            skillsMatched,
            missingSkills,
            reason,
        } = req.body;

        if(!title || !company) {
            return res.status(400).json({
                message: "Job title and company are required",
            });
        }

        const job = await Job.create({
            user: req.user._id,

            position: title,
            company,
            location: location || "",
            salary: salary || "",
            jobUrl: jobUrl || "",
            status: "Wishlist",

            notes: `
            Match Score: ${matchScore || 0}%
            Skills Matched: ${skillsMatched?.join(", ") || "None"}
            Missing Skills: ${missingSkills?.join(", ") || "None"}
            
            
            Why this job: ${reason || "N/A"}
            `.trim(),
        })

        res.status(201).json({success: true, job});
    } catch (error) {
        console.error("Save Job Error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

router.post("/save", protect, async (req, res) => {
    try {
        const { company, position, title } = req.body;
        const jobPosition = position || title;
        if (!company || !jobPosition) return res.status(400).json({ message: "Company and Position required" });

        const job = await Job.create({
            company,
            position: jobPosition,
            location: req.body.location || "",
            salary: req.body.salary || "",
            status: "Wishlist",
            notes: req.body.reason || "",
            user: req.user._id,
        });
        res.status(201).json({ success: true, job });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/", protect, async (req, res) => {
    try {
        const { company, position, location, jobUrl, salary, status, appliedDate, notes, } =req.body;

        if(!company?.trim() || !position?.trim()) {
            return res.status(400).json({
                message: "Company and Position are required",
            })
        }
        const job = await Job.create({
            user: req.user._id,
            company: company.trim(),
            position: position.trim(),
            location: location || "",
            jobUrl: jobUrl || "",
            salary: salary || "",
            status: status || "Wishlist",
            notes: notes || "",
            appliedDate: req.body.status === "Applied" ? new Date() : undefined,
        });
        res.status(201).json(job);
    }
    catch (err) {
        console.error("Create Job Error:", err);
        res.status(500).json({
            message: err.message,
        });
    }
});

router.put("/edit/:id", protect, async (req, res) => {
    try{
        const { company, position, location, jobUrl, salary, status, notes } = req.body;

        const allowed = ["Wishlist" ,"Applied", "Interview", "Offer", "Rejected"];

        if(!allowed.includes(status)){
            return res.status(400).json({
                message: "Invalid status",
            });
        }

        if(!company  || !position ) {
            return res.status(400).json({
                message: "Company and Position are required",
            })
        }

        const job = await Job.findOne({
            _id: req.params.id,
            user: req.user._id,
        });
        
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }

        job.company = company.trim();
        job.position = position.trim();
        job.location = location || "";
        job.jobUrl = jobUrl || "";
        job.salary = salary || "";
        job.status = status;
        job.notes = notes || "";
        if (status === "Applied" && job.status !== "Applied") {
            job.appliedDate = new Date();
        }
        job.status = status;
        job.notes = notes;

        await job.save();
        
        res.json(job);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

router.delete("/:id", protect, async(req, res)=>{
    try{
        await Job.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });
        res.json({ message: "Job deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message,});
    }
});



export default router;
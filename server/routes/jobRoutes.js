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

router.post("/", protect, async (req, res) => {
    try {
        const { company, position } =req.body;

        if(!company || !position) {
            return res.status(400).json({
                message: "Company and Position are required",
            })
        }
        const job = await Job.create({
            ...req.body,
            user: req.user._id,
        });
        res.status(201).json(job);
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});

router.put("/edit/:id", protect, async (req, res) => {
    try{
        const { company, position, status, notes } = req.body;

        const allowed = ["Applied", "Interview", "Offer", "Rejected"];

        if(!allowed.includes(req.body.status)){
            return res.status(400).json({
                message: "Invalid status",
            });
        }

        if(!company  || !position ) {
            return res.status(400).json({
                message: "Company and Position are required",
            })
        }

        const job = await Job.findOneAndUpdate({
            _id: req.params.id,
            user: req.user._id,
        });
        
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }

        job.company = company;
        job.position = position;
        job.status = status;
        job.notes = notes;

        await job.save();
        
        res.json(job);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}) ;

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
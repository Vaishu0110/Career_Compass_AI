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

router.put("/:id", protect, async (req, res) => {
    try{
        await Job.findOneAndUpdate({
            _id: req.params.id,
            user: req.user._id,
        },
        {
            status: req.body.status,
        },
        {
            new: true,
        });
        res.json({
            success: true,
        });
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
        res.json({success: true,});
    } catch (error) {
        res.status(500).json({message: error.message,});
    }
});

export default router;
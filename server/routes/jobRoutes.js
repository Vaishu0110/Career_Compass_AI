import express from "express";
import Job from "../models/Job.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find().sort({
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

router.post("/", async (req, res) => {
    try {
        const job = await Job.create(req.body);
        res.status(201).json(job);
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});

router.put("/:id", async (req, res) => {
    try{
        await Job.findByIdAndUpdate(req.params.id,{status: res.body.status,},{new: true,});
        res.json({
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}) ;

router.delete("/:id", async(req, res)=>{
    try{
        await Job.findByIdAndDelete(req.params.id);
        res.json({success: true,});
    } catch (error) {
        res.status(500).json({message: error.message,});
    }
});

export default router;
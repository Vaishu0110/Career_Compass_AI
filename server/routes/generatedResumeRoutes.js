import express from "express";
import GeneratedResume from "../models/GeneratedResume.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/save", protect, async (req, res) => {
    try{
        const resume = await GeneratedResume.create({
            user:req.user._id,
            fullName: req.body.fullName,
            targetRole: req.body.targetRole,
            template: req.body.template,
            resume:req.body.resume,

        });

        res.json({
            success:true,
            resume,
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
});

router.get("/", protect, async (req, res) => {
    try{
        const resumes=await GeneratedResume.find({
            user:req.user._id,
        }).sort({
            createdAt: -1,
        });
        res.json(resumes);
    } catch (error) {
        res.status(500).json({
            message:error.message,
        });
    }
});

router.delete("/:id", protect, async (req, res) => {
    try{
        const resume = await GeneratedResume.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if(!resume) {
            return res.status(404).json({
                message: "Resume not found",
            });
        }

        await resume.deleteOne();

        res.json({
            success:true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

export default router;
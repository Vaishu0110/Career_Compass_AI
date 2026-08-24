import express from "express";
import path from "path";
import fs from "fs";
import { protect } from "../middleware/authMiddleware.js";
import Resume from "../models/Resume.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
    try{
        const resumes = await Resume.find({
            user: req.user._id,
        }).sort({
            createdAt: -1,
        });

        res.json(resumes);
    }catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

router.get("/download/:id", protect, async (req, res) => {
    try{
        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!resume || !fs.existsSync(resume.fileUrl)) {
            return res.status(404).json({
                message: "Resume file not found.",
            });
        }

        const absolutePath = path.resolve(resume.fileUrl);
        res.download(absolutePath, resume.originalName);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

export default router;
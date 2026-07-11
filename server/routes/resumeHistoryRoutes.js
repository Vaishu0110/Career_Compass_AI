import express from "express";
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

export default router;
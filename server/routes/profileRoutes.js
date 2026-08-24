// server/routes/profileRoutes.js
import express from "express";
import User from "../models/User.js";
import multer from "multer";
import { protect } from "../middleware/authMiddleware.js";
import fs from "fs";
import path from "path";

const router = express.Router();

const uploadDir = path.join("/tmp", "uploads", "profile");
try {
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
} catch (e) {
    console.warn("Profile upload directory notice:", e.message);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.get("/", protect, async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

router.put("/", protect, upload.single("profilePicture"), async (req, res) => {
    try {
        const {
           name,
           role,
           targetRole,
           education,
           experience,
           skills,
           phone,
           college,
           portfolio,
           github,
           linkedin,  
        } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User Not Found",
            });
        }
        
        if (name) user.name = name;
        if (role) user.role = role;
        if (targetRole) user.targetRole = targetRole;
        if (education) user.education = education;
        if (experience) user.experience = experience;
        if (phone) user.phone = phone;
        if (college) user.college = college;
        if (portfolio) user.portfolio = portfolio;
        if (github) user.github = github;
        if (linkedin) user.linkedin = linkedin;
        if (skills) {
            if (typeof skills === "string") {
                try {
                    user.skills = JSON.parse(skills);
                } catch {
                    user.skills = skills.split(",").map(s => s.trim()).filter(Boolean);
                }
            } else if (Array.isArray(skills)) {
                user.skills = skills;
            }
        }
        
        user.profileCompleted = true;

        if (req.file) {
            user.profilePicture = req.file.filename;
        }
        await user.save();
        
        res.json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

export default router;
import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
    try{
        res.json(req.user);
    } catch (error) {
        res.status(500).json({
            message: error.messsage,
        });
    }
});

router.put("/", protect, async (req, res) => {
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

        if(!user) {
            return res.status(404).json({
                message: "User Not Found",
            });
        }
        user.name = name;
        user.role = role;
        user.targetRole = targetRole;
        user.education = education;
        user.experience = experience;
        user.skills = skills;
        user.phone = phone;
        user.college = college;
        user.portfolio = portfolio;
        user.github = github;
        user.linkedin =linkedin;
        user.profileCompleted = true;

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
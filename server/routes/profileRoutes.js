// server/routes/profileRoutes.js
import express from "express";
import User from "../models/User.js";
import multer from "multer";
import { protect } from "../middleware/authMiddleware.js";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed."));
        }
    },
});

const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "career-compass/profile",
                resource_type: "image",
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
        uploadStream.end(fileBuffer);
    });
};

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
        if (skills !== undefined) {
                if (typeof skills === "string") {
                    try {
                        user.skills = JSON.parse(skills);
                    } catch {
                        user.skills = skills
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean);
                    }
                } else if (Array.isArray(skills)) {
                    user.skills = skills;
                }
            }
        
        if (req.file) {
                console.log("Uploading profile image to Cloudinary...");
                const result = await uploadToCloudinary(req.file.buffer);
                user.profilePicture = result.secure_url;
                console.log(
                    "Profile image uploaded:",
                    result.secure_url
                );
            }
            user.profileCompleted = true;
            await user.save();
            res.json({
                success: true,
                user,
            });
        } catch (error) {
            console.error("Profile update error:", error);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
);
export default router;
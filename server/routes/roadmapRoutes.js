import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { generateRoadmap } from "../services/ai/roadmapAI.js";
import LearningRoadmap from "../models/LearningRoadmap.js";

const router = express.Router();

router.post("/generate", protect, async(req, res)=>{
    try {
        const { targetRole, missingSkills = [] } = req.body;

        if(!targetRole?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Target role is required",
            });
        }

        const result = await generateRoadmap(targetRole.trim(), missingSkills);

        res.json({
            success: true,
            result,
        });

    } catch (error) {
        console.error("Roadmap generation error", error);
        res.status(500).json({
            success: false,
            message:"Roadmap generation Failed",
        });
    }
});

router.post("/save", protect, async (req, res) => {
    try {

        const {targetRole, currentSkills,missingSkills ,roadmap, estimatedTime, } = req.body;

        if(!targetRole?.trim() || !Array.isArray(roadmap) || roadmap.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Target role and roadmap are required",
            })
        }

        const savedRoadmap = await LearningRoadmap.create({

            user: req.user._id,
            targetRole: targetRole.trim(),
            currentSkills: currentSkills || "",
            missingSkills: missingSkills || [],
            estimatedTime: estimatedTime || "Unknown",

            roadmap: roadmap.map((step) => ({
                title: typeof step === "string" ? step : step.title,
                description: typeof step === "string" ? "" : step.description || "",
                duration: typeof step === "string" ? "" : step.duration || "",
                completed: false,
            })),

            progress: 0,
        });

        res.status(201).json({
            success: true,
            roadmap: savedRoadmap,
        });

    } catch (error) {
        console.error("Save roadmap error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

router.get("/", protect, async (req, res) => {
    try{
        const roadmap = await LearningRoadmap.findOne({
            user: req.user._id
        }).sort({
            createdAt: -1,
        });

        res.json({ success: true, roadmap,});

    } catch (error) {
        console.error("Fetch roadmap error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

router.put("/:id", protect, async (req, res)=> {
    try{
        const roadmap = await LearningRoadmap.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if(!roadmap) {
            return res.status(404).json({
                success: false,
                message: "Roadmap not found",
            });
        }

        if(!Array.isArray(req.body.roadmap)) {
            return res.status(400).json({
                success: false,
                message: "Invalid roadmap data",
            });
        }

        roadmap.roadmap = req.body.roadmap;

        const completed = roadmap.roadmap.filter(
            item => item.completed).length;

        roadmap.progress = roadmap.roadmap.length ? Math.round((completed / roadmap.roadmap.length) * 100) : 0;

        await roadmap.save();

        res.json({
            success: true,
            roadmap,
        });

    } catch (error) {

        console.error("Update roadmap error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

router.delete("/:id", protect, async (req, res) => {
    try{
        const roadmap = await LearningRoadmap.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if(!roadmap) {
            return res.status(404).json({
                success: false,
                message: "Roadmap not found",
            });
        }
        res.json({
            success: true,
            message: "Roadmap deleted successfully",
        });

    } catch (error) {
        console.error("Delete roadmap error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

export default router;
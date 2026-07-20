import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { generateRoadmap } from "../services/ai/roadmapAI.js";
import LearningRoadmap from "../models/LearningRoadmap.js";

const router = express.Router();

router.post("/generate", protect, async(req, res)=>{
    try {
        const { targetRole }=req.body;
        const result= await generateRoadmap(targetRole);
        res.json({
            success: true,
            result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message:"Roadmap generation Failed",
        });
    }
});

router.post("/save", protect, async (req, res) => {
    try {

        const {targetRole, roadmap } = req.body;

        const savedRoadmap = await LearningRoadmap.create({
            user: req.user._id, targetRole,
            roadmap: roadmap.map(step => ({
                title: step,
                completed: false,
            })),
        });
    } catch (error) {
        console.error(error);

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

        res.json(roadmap);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

router.put("/:id", protect, async (req, res)=> {
    try{
        const roadmap = await LearningRoadmap.findById(req.params.id);

        if(!roadmap) {
            return res.status(404).json({
                message: "Roadmap not found",
            });
        }

        roadmap.roadmap = req.body.roadmap;

        const completed = roadmap.roadmap.filter(
            item => item.completed).length;

        roadmap.progress = Math.round((completed / roadmap.roadmap.length) * 100);

        await roadmap.save();

        res.json({
            success: true,
            roadmap,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

export default router;
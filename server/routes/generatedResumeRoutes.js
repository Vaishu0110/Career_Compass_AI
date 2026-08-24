import express from "express";
import GeneratedResume from "../models/GeneratedResume.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/save", protect, async (req, res) => {
    try{
        const {
            fullName,
            targetRole,
            template,
            resume,
        } = req.body;

        if (!fullName || !targetRole || !resume){
            return res.status(400).json({
                success: false,
                message: "Full name, target role and resume data are required.",
            });
        }

        const savedResume = await GeneratedResume.create({
            user:req.user._id,
            fullName,
            targetRole,
            template: template || "Developer",
            resume,
        });

        res.status(201).json({
            success:true,
            resume: savedResume,
        });

    } catch (error) {

        console.error("Save generated resume error:", error);

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

router.get("/:id", protect, async (req, res) => {
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

        res.json(resume);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

router.put("/:id", protect, async (req, res) => {
    try{
        if (!req.body.fullName || !req.body.targetRole || !req.body.resume) {
            return res.status(400).json({
                success: false,
                message: "Full name, target role and resume data are required.",
            });
        }

        const resume = await GeneratedResume.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id,
            },
            {
                fullName: req.body.fullName,
                targetRole: req.body.targetRole,
                template: req.body.template,
                resume: req.body.resume,
            },
            {
                returnDocument: true,
                runValidators: true,
            }
        );

        if(!resume) {
            return res.status(404).json({
                message: "Resume not found",
            });
        }

        res.json({
            success: true,
            resume,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

export default router;
import express from "express";
import { askCareerCoach } from "../services/ai/careerCoachAI.js";
import { protect } from "../middleware/authMiddleware.js";
import CareerChat from "../models/CareerChat.js";
import User from "../models/User.js";
import Resume from "../models/Resume.js";

const router = express.Router();

router.post("/ask" ,protect, async (req, res)=> {
    try {
        const { question, history = [], chatId } = req.body;

        if(!question) {
            return res.status(400).json({
                success: false,
                message: "Question is Required",
            });
        }

        const user = await User.findById(req.user._id).select(
            "-password"
        );

        const resume = await Resume.findOne({
            user: req.user._id,
        }).sort({
            createdAt: -1,
        });

        const profile = {
            name: user.name,
            role: user.role,
            targetRole: user.targetRole,
            education: user.education,
            degree: user.degree,
            college: user.college,
            experience: user.experience,
            skills: user.skills,
        };

        const resumeAnalysis = resume ? {
            atsScore: resume.atsScore,
            resumeScore: resume.resumeScore,
            analysis: resume.analysis,
        }: null;

        const response = await askCareerCoach(question, history, profile, resumeAnalysis);

        let chat;

        if(chatId){

            chat = await CareerChat.findOne({
                _id: chatId,
                user: req.user._id,
            });

            if(!chat) {
                return res.status(404).json({
                    success: false,
                    message: "Chat not found",
                });
            }
        } else {

            chat = await CareerChat.create({
                user: req.user._id,
                title: question.substring(0, 30),
                messages: [],
            });
        }

        chat.messages.push(
            {
                sender: "user",
                text: question,
            },
            {
                sender: "ai",
                text: response,
            }
        );

        await chat.save();

        res.json({
            success: true,
            response,
            chatId: chat._id,
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message:"Career Coach AI failed",
        });
    }
});

router.get("/", protect, async (req, res) => {

    const chats = await CareerChat.find({
        user: req.user._id,
    }).sort({
        updatedAt: -1,
    });

    res.json(chats);
});

router.delete("/:id", protect, async (req,res) => {
    try{
        const chat = await CareerChat.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if(!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found",
            });
        }

        res.json({
            success: true,
            message: "Chat deleted successfully",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

export default router;

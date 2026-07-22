import express from "express";
import { askCareerCoach } from "../services/ai/careerCoachAI.js";
import { protect } from "../middleware/authMiddleware.js";
import CareerChat from "../models/CareerChat.js";

const router = express.Router();

router.post("/ask" ,protect, async (req, res)=> {
    try {
        const { question, history, chatId } = req.body;
        if(!question) {
            return res.status(400).json({
                success: false,
                message: "Question is Required",
            });
        }
        const response = await askCareerCoach(question, history);

        let chat;

        if(chatId){

            chat = await CareerChat.findById(chatId);
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
    await CareerChat.findByIdAndDelete(req.params.id);

    res.json({
        success: true,
        response,
        chatId: chat._id,
    });
});

export default router;

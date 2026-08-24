import express from "express";
import Interview from "../models/InterviewSession.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {

    const history = await InterviewSession.find({
        user:req.user._id
    }).sort({
        createdAt:-1
    });

    res.json(history);

});

export default router;
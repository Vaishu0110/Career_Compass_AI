import express from "express";
import Interview from "../models/Interview.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {

    const history = await Interview.find({
        user:req.user._id
    }).sort({
        createdAt:-1
    });

    res.json(history);

});

export default router;
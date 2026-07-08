import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/",protect, async (req, res)=>{
    try{
        res.json({
            message: "Job Recommendations API Working"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

export default router;
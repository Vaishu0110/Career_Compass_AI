import { generateResumeWithAI } from "../services/resumeGeneratorAI.js";

export const generateResume = async (req, res) => {
    try{
        const resume = await generateResumeWithAI(req.body);

        res.json(resume);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Resume generation failed",
        });
    }
};
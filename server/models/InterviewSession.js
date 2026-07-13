import mongoose from "mongoose";

const interviewSessionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        role: {
            type: String,
            required: true,
        },

        questions: [
            {
                question: String,
                answer: String,
                feedback: String,
                score: Number,
            },
        ],

        overallScore: {
            type: Number,
            default: 0,
        },

        strengths: [String],

        weaknesses: [String],

        suggestions: [String],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("InterviewSession", interviewSessionSchema);
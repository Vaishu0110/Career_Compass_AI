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

        difficulty: {
            type: String,
            default: "Intermediate",
        },

        questions: [
            {
                question: {
                    type: String,
                    required: true,
                },

                answer: {
                    type: String,
                    default: "",
                },

                feedback: {
                    type: String,
                    default: "",
                },

                score: {
                    type: Number,
                    default: 0,
                    min: 0,
                    max: 100,
                },
            },
        ],

        overallScore: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },

        strengths: {
            type: [String],
            default: [],
        },

        weaknesses: {
            type: [String],
            default: [],
        },

        suggestions: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("InterviewSession", interviewSessionSchema);
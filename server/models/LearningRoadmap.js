// server/models/LearningRoadmap.js
import mongoose from "mongoose";

const learningRoadmapSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        targetRole: {
            type: String,
            required: true,
        },

        currentSkills: {
            type: mongoose.Schema.Types.Mixed,
            default: "None",
        },

        missingSkills: {
            type: [String],
            default: [],
        },

        roadmap: [
            {
                title: {
                    type: String,
                    required: true,
                },

                description: {
                    type: String,
                    default: "",
                },

                duration: {
                    type: String,
                    default: "",
                },

                completed: {
                    type: Boolean,
                    default: false,
                },
            },
        ],

        estimatedTime: {
            type: String,
            default: "Unknown",
        },

        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("LearningRoadmap", learningRoadmapSchema);
import mongoose from "mongoose";

const learningRoadSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    targetRole: String,

    roadmap: [
        {
            title: String,
            completed: {
                type: Boolean,
                default: false,
            },
        },
    ],

    progress: {
        type: Number,
        default:  Date.now,
    },
});

export default mongoose.model(
    "LearningRoadmap",
    learningRoadmapSchemma
);
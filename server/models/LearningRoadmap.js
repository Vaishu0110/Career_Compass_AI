import mongoose from "mongoose";

const learningRoadmapSchema = new mongoose.Schema({
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
        default: 0,
    },
});

export default mongoose.model(
    "LearningRoadmap",
    learningRoadmapSchema
);
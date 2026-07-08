import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            default: "My Resume",
        },

        version: {
            type: Number,
            default: 1,
        },

        originalName: {
            type: String,
            required: true,
        },

        fileUrl: {
            type: String,
            required: true,
        },

        fileSize: {
            type: Number,
            default: 0,
        },

        atsScore: {
            type: Number,
            default: 0,
        },

        resumeScore: {
            type: Number,
            default: 0,
        },
        analysis: {
            type: Object,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Resume", resumeSchema);
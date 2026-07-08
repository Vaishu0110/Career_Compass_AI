import mongoose from "mongoose";
const jobRecommendationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: String,

        company : String,

        location: String,

        salary: String,

        matchScore: Number,

        skillsMatched: [String],

        missingSkills: [String],

        reason: String,

        applyLink: String,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model(
    "JobRecommendation",
    jobRecommendationSchema
);
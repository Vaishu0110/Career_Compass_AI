import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        
        company: {
            type: String,
            required: true,
            trim: true,
        },

        position: {
            type: String,
            required: true,
            trim: true,
        },

        location : {
            type: String,
            default: "",
        },

        jobUrl: {
            type: String,
            default: "",
        },

        salary: {
            type: String,
            default: "",
        },
        
        status: {
            type: String,
            enum :[
                "Wishlist",
                "Applied",
                "Interview",
                "Offer",
                "Rejected",
            ],
            default: "Wishlist",
        },

        appliedDate: {
            type: Date,
        },

        notes: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Job", jobSchema);
import mongoose from "mongoose";

const generatedResumeSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },

        fullName:String,
        targetRole:String,

        template:String,

        resume:{
            type: Object,
            required:true,
        },

        createdAt:{
            type:Date,
            default:Date.now,
        },
    });

export default mongoose.model(
    "GeneratedResume", generatedResumeSchema
);
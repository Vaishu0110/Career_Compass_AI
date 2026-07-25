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

        template:{
            fullName: String,
            targetRole:String,
            default:"modern",
        },

        resume:{
            type: Object,
            required:true,
        },
    },
    {
        timestamp: true,
    }     
);

export default mongoose.model(
    "GeneratedResume", generatedResumeSchema
);
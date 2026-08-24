import mongoose from "mongoose";

const generatedResumeSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },

        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        targetRole: {
            type:String,
            required:true,
            trim:true,
        },

        template:{
            type: String,
            enum: [
                "Modern",
                "Corporate",
                "Developer",
                "Student",
                "Executive",
                "Professional",
            ],
            default:"Modern",
        },

        resume:{
            type: Object,
            required:true,
        },
    },
    {
        timestamps: true,
    }     
);

export default mongoose.model(
    "GeneratedResume", generatedResumeSchema
);
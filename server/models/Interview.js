import mongoose from "mongoose";

const interview = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },

        role:String,

        difficulty:String,

        overallScore:Number,

        strength:[String],

        weaknesses:[String],

        suggestions:[String],

        createdAt:{
            type:Date,
            default:Date.now,
        },
    }
);

export default mongoose.model("Interview", interviewSchema);

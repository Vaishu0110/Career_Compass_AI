import mongoose from "mongoose";

const skillGapSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    targetRole:String,

    currentSkills:String,

    missingSkills:[String],

    roadmap:[String],

    estimatedTime:String,

    createdAt:{
        type:Date,
        default:Date.now,
    }
});

export default mongoose.model("SkillGap", skillGapSchema);
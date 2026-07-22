import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    role: String,
    content: String,
});

const careerCoachSchema = new mongoose.Schema(
    {
        user: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },

        title:{
            type: String,
            default:"New Chat",
        },

        message:[messageSchema],

    },{
        timestamp:true,
    }
);

export default mongoose.model("CareerCoach", careerCoachSchema);

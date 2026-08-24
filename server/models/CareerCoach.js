import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        enum: ["user", "ai"],
        required: true,
    },

    text: {
        type: String,
        required: true,
    },
},
{
    _id: false,
}
);

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

        messages : [messageSchema],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("CareerCoach", careerCoachSchema);

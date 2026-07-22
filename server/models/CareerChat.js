import mongoose from "mongoose";

const careerChatSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },

        messages:[
            {
                sender:String,
                text:String,
                time:{
                    type:Date,
                    default:Date.now,
                },
            },
        ],
    },

    {
        timestamps:true,
    }
);

export default mongoose.model("CareerChat", careerChatSchema);
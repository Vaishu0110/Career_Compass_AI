import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },

        role: {
            type: String,
            required: true,
        },

        difficulty:{
            type:String,
            required: true,
        },

        questions: [
            {
                question: {
                    type:String,
                    default: "",
                },
                answer: {
                    type:String,
                    default: "",
                },

                score: {
                    type:Number,
                    daefult: 0,
                },
                feedback: {
                    type: String,
                    default: "",
                },
            },
        ],

        overallScore:{
            type:Number,
            default: 0,
        },

        strength:{
            type:[String],
            default: [],
        },

        weaknesses:{
            type:[String],
            default: [],
        },

        suggestions:{
            type:[String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Interview", interviewSchema);

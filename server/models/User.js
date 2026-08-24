import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name :{
            type : String,
            required : true,
        },

        email : {
            type: String,
            required:true,
            unique:true,
            lowercase:true,
        },

        password:{
            type:String,
            required:true,
        },

        role : {
            type: String,
            default:"Student",
        },

        profilePicture:{
            type:String,
            default:"",
        },


        phone:{
            type:String,
            default:"",
        },

        college:{
            type:String,
            default:"",
        },

        degree:{
            type:String,
            default:"",
        },
        education:{
            type:String,
            default:"",
        },

        experience:{
            type:String,
            default:"",
        },

        targetRole : {
            type : String,
            default: "",
        },

        skills: {
            type : [String],
            default: [],
        },
        
        github:{
            type:String,
            default:"",
        },

        linkedin:{
            type:String,
            default:"",
        },

        portfolio:{
            type:String,
            default:"",
        },

        resumeScore:{
            type: Number,
            default: 0,
        },

        atsScore:{
            type: Number,
            default: 0,
        },

        resumeCount:{
            type: Number,
            default:0,
        },

        analysisCount:{
            type:Number,
            default:0,
        },

        interviewCount:{
            type:Number,
            default:0,
        },

        jobApplication:{
            type:Number,
            default:0,
        },

        profileCompleted:{
            type:Boolean,
            default: false,
        },
    },
    {
        timestamps : true,
    }
);

const User = mongoose.models.User || mongoose.model("User",userSchema);

export default User;
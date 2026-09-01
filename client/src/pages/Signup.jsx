 import { useState } from "react";
 import axiosInstance from "../api/axiosInstance";
 import { Link, useNavigate } from "react-router-dom";
 import { Compass, User, Mail, Lock, UserPlus } from "lucide-react";

 export default function Signup(){
    const navigate = useNavigate();
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
    });

    const handleChange =(e)=> {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };
    const handleSubmit =async (e)=>{e.preventDefault()
        try{
            await axiosInstance.post(
                "/auth/register",
                formData
            );
            alert("Registration Successful");
            navigate("/login")
        } catch (error) {
            alert(error.response?.data?.message || "Registration Failed");
        }
    };
    return(
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6 relative overflow-hidden">
        <div className="absolute w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -top-20 -left-20 pointer-events-none" />
        <div className="absolute w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -bottom-20 -right-20 pointer-events-none" />
        <div className="bg-slate-900/90 border border-teal-500/30 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-xl w-full max-w-md space-y-8 relative z-10">
            <div className="text-center space-y-3">
                <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-teal-100 via-emerald-200 to-teal-50 bg-clip-text text-transparent">
                    Career Compass AI
                </h1>
                <p className="text-xs text-teal-300/80 font-medium">
                    Create your account and start building your personalized career path.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-teal-300 mb-1.5">
                        Full Name
                    </label>

                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-500 pointer-events-none" />

                        <input type="text" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} className="w-full bg-slate-950 border border-teal-800/80 rounded-2xl py-4 pl-11 pr-4 text-sm text-white [&::placeholder]:opacity-20 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition" required />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-teal-300 mb-1.5">
                        Email Address
                    </label>

                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-500 pointer-events-none" />
                        <input type="email" name="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} className="w-full bg-slate-950 border border-teal-800/80 rounded-2xl py-4 pl-11 pr-4 text-sm text-white [&::placeholder]:opacity-20 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition" required />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-teal-300 mb-1.5">
                        Password
                    </label>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-500 pointer-events-none" />
                        <input type="password" name="password" placeholder="Create a secure password" value={formData.password} onChange={handleChange} className="w-full bg-slate-950 border border-teal-800/80 rounded-2xl py-4 pl-11 pr-4 text-sm text-white [&::placeholder]:opacity-20 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition" required />
                    </div>
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold py-4 rounded-2xl shadow-lg hover:shadow-xl transition transform active:scale-95 text-base mt-2 flex items-center justify-center gap-2" >
                    <UserPlus className="w-5 h-5" />
                    Create Career Compass Account
                </button>
            </form>

            <div className="text-center pt-2 border-t border-teal-900/70">
                <p className="text-xs text-teal-300/80">
                    Already have an account?{" "}
                    <Link to="/login" className="text-emerald-400 font-bold hover:text-emerald-300 hover:underline transition" >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    </div>
    )
};
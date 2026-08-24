import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";


export default function ProfileSetup(){
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    const [image, setImage] = useState(null);

    const [formData, setFormData]= useState({
        name: "",
        role: "",
        education: "",
        targetRole: "",
        college: "",
        phone: "",
        experience: "",
        skills: "",
        portfolio: "",
        github: "",
        linkedin: "",
        });
    useEffect(() => {
        if(user) {
            setFormData({
                name: user.name || "",
                role: user.role || "",
                targetRole: user.targetRole || "",
                education: user.education || "",
                college: user.college || "",
                phone: user.phone || "",
                experience: user.experience || "",
                skills: (user.skills || []).join(", "),
                portfolio: user.portfolio || "",
                github: user.github || "",
                linkedin: user.linkedin || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,[e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            
            const data = new FormData();

            data.append("role", formData.role);
            data.append("education", formData.education);
            data.append("targetRole", formData.targetRole);

            data.append("skills", JSON.stringify(formData.skills.split(",").map(skill => skill.trim()).filter(skill => skill)));

            if (image) {
                data.append("profilePicture", image);
            }

            const res = await axiosInstance.put("/profile",
                data,
                {
                    headers: {
                        "Content-type": "multipart/form-data",
                    },
                }
            );
            setUser(res.data.user);
            alert("Profile Updated");
            navigate("/dashboard");
        } catch(error){
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6 md:p-10 relative overflow-hidden">
            
            {/* AMBIENT BACKGROUND GLOW */}
            <div className="absolute w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -top-20 -left-20 pointer-events-none" />
            <div className="absolute w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -bottom-20 -right-20 pointer-events-none" />
            {/* ONBOARDING CARD */}
            <div className="bg-slate-900/90 border border-teal-500/30 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-xl w-full max-w-2xl space-y-8 relative z-10">
                
                {/* BRAND HEADER */}
                <div className="text-center space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white font-black text-2xl shadow-lg mx-auto">
                        🧭
                    </div>
                    <h1 className="text-2xl md:text-4xl font-black bg-gradient-to-r from-teal-100 via-emerald-200 to-teal-50 bg-clip-text text-transparent">
                        Complete Your Profile
                    </h1>
                    <p className="text-xs text-gray-400 font-medium">
                        Set up your career goals and technical profile to unlock AI recommendations.
                    </p>
                </div>
                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* ROLE SELECTOR */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                            Candidate Status / Role *
                        </label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="w-full bg-slate-950 border border-teal-800/80 rounded-2xl p-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
                        >
                            <option value="">Select Role Category</option>
                            <option value="Student">Student</option>
                            <option value="Fresher">Fresher / Graduate</option>
                            <option value="Professional">Working Professional</option>
                        </select>
                    </div>
                    {/* NAME & PHONE */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-slate-950 border border-teal-800/80 rounded-2xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="+1 (555) 000-0000"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full bg-slate-950 border border-teal-800/80 rounded-2xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>
                    {/* TARGET ROLE & COLLEGE */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                                Target Position / Role *
                            </label>
                            <input
                                type="text"
                                name="targetRole"
                                placeholder="e.g. MERN Stack Engineer"
                                value={formData.targetRole}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-950 border border-teal-800/80 rounded-2xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                                College / University
                            </label>
                            <input
                                type="text"
                                name="college"
                                placeholder="University Name"
                                value={formData.college}
                                onChange={handleChange}
                                className="w-full bg-slate-950 border border-teal-800/80 rounded-2xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>
                    {/* EDUCATION & SKILLS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                                Degree / Education
                            </label>
                            <input
                                type="text"
                                name="education"
                                placeholder="B.S. Computer Science"
                                value={formData.education}
                                onChange={handleChange}
                                className="w-full bg-slate-950 border border-teal-800/80 rounded-2xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                                Core Skills (Comma Separated)
                            </label>
                            <input
                                type="text"
                                name="skills"
                                placeholder="React, Node.js, Python..."
                                value={formData.skills}
                                onChange={handleChange}
                                className="w-full bg-slate-950 border border-teal-800/80 rounded-2xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>
                    {/* SOCIAL LINKS */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                            type="text"
                            name="portfolio"
                            placeholder="Portfolio URL"
                            value={formData.portfolio}
                            onChange={handleChange}
                            className="w-full bg-slate-950 border border-teal-800/80 rounded-2xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <input
                            type="text"
                            name="github"
                            placeholder="GitHub URL"
                            value={formData.github}
                            onChange={handleChange}
                            className="w-full bg-slate-950 border border-teal-800/80 rounded-2xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <input
                            type="text"
                            name="linkedin"
                            placeholder="LinkedIn URL"
                            value={formData.linkedin}
                            onChange={handleChange}
                            className="w-full bg-slate-950 border border-teal-800/80 rounded-2xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    {/* EXPERIENCE */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                            Experience & Projects Summary
                        </label>
                        <textarea
                            name="experience"
                            placeholder="Briefly describe your prior experience or key project highlights..."
                            value={formData.experience}
                            onChange={handleChange}
                            rows="3"
                            className="w-full bg-slate-950 border border-teal-800/80 rounded-2xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
                        />
                    </div>
                    {/* PROFILE PICTURE PICKER */}
                    <div className="p-4 rounded-2xl bg-slate-950 border border-teal-800/80 flex items-center justify-between gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                                Profile Photo
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="text-xs text-gray-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-600 file:text-white hover:file:bg-teal-700 cursor-pointer"
                            />
                        </div>
                        {image && (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400 shadow"
                            />
                        )}
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold py-4 rounded-2xl shadow-lg hover:shadow-xl transition transform active:scale-95 text-base mt-2"
                    >
                        Save & Launch Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
}
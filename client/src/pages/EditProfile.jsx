import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        education: "",
        targetRole: "",
        skills: "",
        experience: "",
        profilePicture: "",
    });

    useEffect(()=> {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axiosInstance.get("/profile");

            setFormData({
                name: res.data.name || "",
                email: res.data.email || "",
                education: res.data.education || "",
                targetRole: res.data.targetRole || "",
                skills: (res.data.skills || []).join(","),
                experience: res.data.experience || "",
                profilePicture: res.data.profilePicture || "",
            });
        } catch (error) {
            console.error(error);
        } 
    };
    
    const handleChange = (e) => {
        setFormData ({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const data = new FormData();

            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("education", formData.education);
            data.append("targetRole", formData.targetRole);
            data.append("experience", formData.experience);

            const skillsArray = typeof formData.skills === "string" ? formData.skills.split(",").map(skill => skill.trim()).filter(Boolean) : formData.skills;

            data.append("skills", JSON.stringify(skillsArray));

            if (image) {
                data.append("profilePicture", image);
            }

            await axiosInstance.put("/profile",  data ,{
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Profile updated successfully");
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            console.log(error.response);
            alert(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-8">
            
            {/* HERO HEADER */}
            <div className="text-center max-w-2xl mx-auto">
                <span className="bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Candidate Profile Settings
                </span>
                <h1 className="text-3xl md:text-5xl font-black mt-2 tracking-tight">
                    Edit Profile 👤
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base mt-2">
                    Update your target career goal, core skill set, and profile photo used across AI recommendations.
                </p>
            </div>
            {/* EDIT PROFILE FORM CARD */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl border border-teal-100 dark:border-teal-900">
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* AVATAR UPLOADER */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900">
                        <div className="relative">
                            <img
                                src={
                                    image
                                        ? URL.createObjectURL(image)
                                        : formData.profilePicture
                                        ? `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5000'}/uploads/profile/${formData.profilePicture}`
                                        : "/default-avatar.png"
                                }
                                alt="Profile"
                                className="w-28 h-28 rounded-full object-cover border-4 border-emerald-400 shadow-md"
                            />
                        </div>
                        <div className="space-y-2 text-center sm:text-left">
                            <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
                                Profile Picture
                            </h3>
                            <p className="text-xs text-gray-500">
                                PNG, JPG or WebP up to 5MB. Displayed across your dashboard.
                            </p>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-600 file:text-white hover:file:bg-teal-700 cursor-pointer"
                            />
                        </div>
                    </div>
                    {/* NAME & EMAIL GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-teal-200 dark:border-teal-800 dark:bg-slate-900 rounded-2xl p-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-teal-200 dark:border-teal-800 dark:bg-slate-900 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>
                    {/* TARGET ROLE & EDUCATION GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                                Target Career Role *
                            </label>
                            <input
                                type="text"
                                name="targetRole"
                                placeholder="e.g. Full Stack Developer"
                                value={formData.targetRole}
                                onChange={handleChange}
                                className="w-full border border-teal-200 dark:border-teal-800 dark:bg-slate-900 rounded-2xl p-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                                Education
                            </label>
                            <input
                                type="text"
                                name="education"
                                placeholder="e.g. B.Tech Computer Science"
                                value={formData.education}
                                onChange={handleChange}
                                className="w-full border border-teal-200 dark:border-teal-800 dark:bg-slate-900 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>
                    {/* SKILLS */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                            Core Skills (Comma Separated)
                        </label>
                        <input
                            type="text"
                            name="skills"
                            placeholder="React, Node.js, Express, MongoDB, Tailwind, Python..."
                            value={formData.skills}
                            onChange={handleChange}
                            className="w-full border border-teal-200 dark:border-teal-800 dark:bg-slate-900 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    {/* EXPERIENCE */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                            Professional Experience
                        </label>
                        <textarea
                            name="experience"
                            placeholder="Describe your prior work experience, key projects, and accomplishments..."
                            value={formData.experience}
                            onChange={handleChange}
                            rows={4}
                            className="w-full border border-teal-200 dark:border-teal-800 dark:bg-slate-900 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
                        />
                    </div>
                    {/* SAVE BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold py-4 rounded-2xl shadow-lg hover:shadow-xl transition transform active:scale-95 text-base"
                    >
                        Save Profile Changes 💾
                    </button>
                </form>
            </div>
        </div>
    );
}
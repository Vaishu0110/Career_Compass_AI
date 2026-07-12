import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-rouiter-dom";

export default function EditProfile() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        education: "",
        targetRole: "",
        skills: "",
        experience: "",
    });

    useEffect(()=> {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axiosInstance.get("/auth/profile");

            setFormData({
                name: res.data.name || "",
                email: res.data.email || "",
                education: res.data.education || "",
                targetRole: res.data.targetRole || "",
                skills: res.data.skills || "",
                experience: res.data.experience || "",
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
            await axiosInstance.put("/auth/profile", {
                ...formData,
                skills: formData.skills.split(",").map(skill => skill.trim()).filter(Boolean),
            });

            alert("Profile updated successfully");
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            alert("Failed to update Profile.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-8">
            <h1 className="etx-3xl font-bold mb-6">
                Edit Profile
            </h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-4">
                <input type="text" name="name" placeholder="Name" value={formData.name} 
                onChange={handleChange} className="w-full border p-3 rounded" />
                <input type="email" name="email" placeholder="Email" value={formData.email}
                onChange={handleChange} className="w-full border p-3 rounded" />
                <input type="text" name="education" placeholder="Education" value={formData.education} 
                onChange={handleChange} className="w-full border p-3 rounded" />
                <input type="text" name="targetRole" placeholder="Target Role" value={formData.targetRole} 
                onChange={handleChange} className="w-full border p-3 rounded" />
                <input type="text" name="skills" placeholder="Skills (Comma Seperated)" value={formData.skills}
                onChange={handleChange} className="w-full border p-3 rounded" />
                <textarea name="experience" placeholder="Experience" value={formData.experience}
                onChange={handleChange} className="w-full border p-3 rounded" rows={4} />
                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
                    Save Changes
                </button>
            </form>
        </div>
    );
}
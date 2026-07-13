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
        <div className="max-w-3xl mx-auto p-8">
            <h1 className="etx-3xl font-bold mb-6">
                Edit Profile
            </h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-4">
                <div className="flex felx-col items-center mb-6">
                    <img src={formData.profilePicture ? `http://localhost:5000/uploads/profile/${formData.profilePicture}` : "/default-avatar.png"} alt="Profile" className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 mb-3" />
                    <input type="file" accept="image/*" onChange={(e)=> setImage(e.target.files[0])} />
                </div>
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
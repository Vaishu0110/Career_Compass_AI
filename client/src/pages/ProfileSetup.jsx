import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";


export default function ProfileSetup(){
    const navigate = useNavigate();
    const [formData, setFormData]= useState({
        role:"",
        education:"",
        targetRole:"",
        skills:"",
        experience:"",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,[e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await axiosInstance.put("/auth/profile",formData);
            alert("Profile Updated");
            navigate("/dashboard");
        } catch(error){
            console.error(error);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Complete Your Profile</h1>
            <form onSubmit={handleSubmit}>
                <select name="role"
                value={formData.role} onChange={handleChange}
                className="w-full border p-3 mb-4">
                    <option value="">Select Role</option>
                    <option value="Student">Student</option>
                    <option value="Fresher">Fresher</option>
                    <option value="Professional">Professional</option>
                </select>
                <input type="text" name="education" placeholder="Education"
                onChange={handleChange} className="w-full border p-3 mb-4"/>
                <input type="text" name="targetRole" placeholder="Target Career Role"
                onChange={handleChange} className="w-full border p-3 mb-4"/>
                <input type="text" name="skills" placeholder="Skills (comma seperated)"
                onChange={handleChange} className="w-full border p-3 mb-4"/>
                <textarea name="experience" placeholder="Experience" onChange={handleChange}
                className="w-full border p-3 mb-4"/>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
                    Save Profile
                </button>
            </form>
        </div>
    );
}
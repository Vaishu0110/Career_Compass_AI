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
                <input type="text" name="name" placeholder="Full Name" value={formData.name}
                onChange={handleChange} className="w-full border p-3 mb-4 rounded" />
                <input type="text" name="phone" placeholder="Phone Number" value={formData.phone}
                onChange={handleChange} className="w-full border p-3 mb-4 rounded" />
                <input type="text" name="college" placeholder="College / University" value={formData.college}
                onChange={handleChange} className="w-full border p-3 mb-4 rounded" />
                <input type="text" name="education" placeholder="Education" value={formData.education}
                onChange={handleChange} className="w-full border p-3 mb-4"/>
                <input type="text" name="targetRole" placeholder="Target Career Role"
                onChange={handleChange} className="w-full border p-3 mb-4"/>
                <input type="text" name="skills" placeholder="Skills (comma seperated)"
                onChange={handleChange} className="w-full border p-3 mb-4"/>
                <input type="text" name="portfolio" placeholder="Portfolio URL" value={formData.portfolio}
                onChange={handleChange} className="w-full border p-3 mb-4 rounded" />
                <input type="text" name="github" placeholder="Github URL" value={formData.github}
                onChange={handleChange} className="w-full border p-3 mb-4 rounded" />
                <input type="text" name="linkedin" placeholder="Linkedin URL" value={formData.linkedin}
                onChange={handleChange} className="w-full border p-3 mb-4 rounded" />
                <textarea name="experience" placeholder="Experience" onChange={handleChange}
                className="w-full border p-3 mb-4"/>
                <div className="mb-4">
                    <label className="block font-medium mb-2">
                        Profile Picture
                    </label>
                    <input type="file" accept="image/*" onChange={(e)=> setImage(e.target.files[0])} />    
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
                    Save Profile
                </button>
            </form>
        </div>
    );
}
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function MyResumes() {
    const [resumes, setResumes] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try{
            const res = await axiosInstance.get("/generated-resume");

            setResumes(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteResume = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this resume?"
        );

        if(!confirmed) return;

        try{
            await axiosInstance.delete(`/generated-resume/${id}`);

            setResumes((prev) =>
                prev.filter((resume) => resume._id !== id)
            );

        } catch (error) {
            console.error(error);
            alert("Failed to delete resume");
        }
    };

    return(
        <div className="max-w-7xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">
                My Saved Resumes
            </h1>

            {resumes.length === 0 ? (
                <p>No resumes saved yet.</p>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    {resumes.map((resume) => (
                        <div key={resume._id} className="border rounded-xl p-5 shadow">
                            <h2 className="text-xl font-bold">
                                {resume.fullName}
                            </h2>
                            <p className="text-gray-500">
                                {resume.targetRole}
                            </p>

                            <p className="mt-2">
                                {resume.template}
                            </p>

                            <div className="flex gap-3 mt-4">

                                <button onClick={() => deleteResume(resume._id)} className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
                                    Delete
                                </button>

                                <button onClick={() => navigate("/resume-generator", {state : {resume} })} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                                    Edit
                                </button>

                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
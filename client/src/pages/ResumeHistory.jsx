import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function ResumeHistory() {
    const [resumes, setResumes] = useState([]);

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const res = await axiosInstance.get("/resume");
            setResumes(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteResume = async (id) => {
        try {
            await axiosInstance.delete(`/resume/${id}`);

            setResumes(resumes.filter((resume) => resume._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return ( 
        <div className="max-w-6xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">
                Resume History
            </h1>

            {resumes.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                    No resumes uploaded yet.    
                </div>
            ) : (
                <div className="space-y-5">
                    {resumes.map((resume) => (
                        <div key={resume._id} className="bg-white rounded-xl shadow p-6 flex justify-between items-center" >
                            <div>
                                <h2 className="text-xl font-bold">
                                    {resume.originalName}
                                </h2>
                                <p className="text-gray-500">
                                    Uploaded: {""} {new Date(resume.createdAt).toLocaleDateString()}
                                </p>
                                <div className="mt-3 flex gap-6">
                                    <span>
                                        ATS: {""} {resume.atsScore}
                                    </span>
                                    <span>
                                        Resume: {""} {resume.resumeScore}
                                    </span>
                                </div>
                            </div>
                            <button onClick={() => deleteResume(resume._id)} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
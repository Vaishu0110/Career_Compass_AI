import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function MyResumes() {
    const [resumes, setResumes] = useState([]);

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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
import { useEffect, useState, useRef } from "react";
import axiosInstance from "../api/axiosInstance";
import { useReactToPrint} from "react-to-print";
import ResumeViewer from "../components/ResumeGenerator/ResumeViewer";
import {useNavigate } from "react-router-dom"; 

export default function ResumeHistory() {
    const [resumes, setResumes] = useState([]);
    const [selectedResume, setSelectedResume] = useState(null);
    const [activeTab, setActiveTab] = useState("uploaded");
    const [generatedResumes, setGeneratedResumes] = useState([]);

    const printRef = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        fetchResumes();
        fetchGeneratedResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const res = await axiosInstance.get("/resume-history");
            setResumes(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchGeneratedResumes = async () => {
        try{
            const res = await axiosInstance.get("/generated-resume");

            setGeneratedResumes(res.data);
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

    const deleteGeneratedResume = async (id) => {
        try {
            await axiosInstance.delete(`/generated-resume/${id}`);

            setGeneratedResumes(
                generatedResumes.filter(
                    resume => resume._id !== id
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    const downloadResume = async (id, fileName) => {
        try {
            const response = await axiosInstance.get(
                `/resume-history/download/${id}`,
                {
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement("a");
            
            link.href = url;

            link.setAttribute("download", fileName);

            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
            alert("Failed to download resume.");
        }
    };

    const handleDownloadGenerated = useReactToPrint({
        content: () => printRef.current,
        documentTitle: "Resume",
    });

    return ( 
        <div className="max-w-6xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">
                Resume History
            </h1>
            <div className="flex gap-4 mb-8">
                <button onClick={() => setActiveTab("uploaded")} 
                className={`px-6 py-2 rounded-lg ${activeTab === "uploaded" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
                    Uploaded Resumes
                </button>

                <button onClick={() => setActiveTab("generated")} className={`px-6 py-2 rounded-lg ${activeTab === "generated" ? "bg-green-600 text-white" : "bg-gray-200" }`}>
                    AI Generated Resume
                </button>
            </div>

            {activeTab === "uploaded" && (resumes.length === 0 ? (
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
                                <p className="text-sm text-gray-500">
                                    Version {resume.version}
                                </p>
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
                            <div className="flex gap-3">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setSelectedResume(resume)}>
                                    View Analysis
                                </button>
                                <button onClick={()=>(deleteResume(resume._id))} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                                    Delete
                                </button>
                                <button onClick={()=> downloadResume(resume._id, resume.originalName)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                                    Download
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ))}

            {activeTab === "generated" && (
                generatedResumes.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        No AI Generated Resumes Yet.    
                    </div>
                ):(
                    <div className="space-y-5">
                        {generatedResumes.map((resume) => (
                            <div key={resume._id} className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold">
                                        {resume.fullName}
                                    </h2>

                                    <p className="text-gray-500">
                                        {resume.targetRole}
                                    </p>

                                    <p className="text-gray-500"> 
                                        Template :  {resume.template}
                                    </p>

                                    <p className="text-sm text-gray-400">
                                        {new Date(resume.createdAt).toLocaleDateString()}
                                    </p>

                                </div>

                                <div className="flex gap-3">
                                    <button onClick={() => setSelectedResume(resume)} className="bg-blue-600 text-white px-4 py-2 rounded">
                                        View
                                    </button>

                                    <button onClick={() => navigate("/resume-generator", {
                                        state: {
                                            resume,
                                        },
                                    })} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                                        Edit
                                    </button>

                                    <button onClick={() => {
                                        setSelectedResume(resume); setTimeout(handleDownloadGenerated, 500);
                                    }} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                                        Download
                                    </button>

                                    <button  onClick={() => deleteGeneratedResume(resume._id)} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )
            )}
            {selectedResume && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {selectedResume.resume ? (
                            <>
                                <h2 className="text-3xl font-bold mb-6">
                                    Generated Resume
                                </h2>

                                <ResumeViewer resume={selectedResume} />
                            </>
                        ):(
                            <>
                                <h2 className="text-3xl font-bold mb-6">
                                    Resume Analysis
                                </h2>

                                <p>
                                    <strong>ATS Score:</strong> {selectedResume.atsScore}
                                </p>

                                <h3 className="font-bold mt-4">
                                    Skills
                                </h3>

                                <ul className="list-disc ml-6">
                                    {selectedResume.analysis?.skills?.map(skill => (
                                        <li key={skill}>{skill}</li>
                                    ))}
                                </ul>

                                <h3 className="font-bold mt-4">
                                    Missing Skills
                                </h3>

                                <ul className="list-disc ml-6">
                                    {selectedResume.analysis?.missingSkills?.map(skill => (
                                        <li key={skill}>{skill}</li>
                                    ))}
                                </ul>

                                <h3 className="font-bold mt-4">
                                    Recommended Roles
                                </h3>

                                <ul className="list-disc ml-6">
                                    {selectedResume.analysis?.recommendedRoles?.map(role => (
                                        <li key={role}>{role}</li>
                                    ))}
                                </ul>

                                <h3 className="font-bold mt-4">
                                    Learning Roadmap
                                </h3>

                                <ul className="list-disc ml-6 mb-6">
                                    {selectedResume.analysis?.roadmap?.map(step => (
                                        <li key={step}>
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                    </div>    
                </div>
            )}

            <div style={{
                position: "absolute",left: "-9999px", top:0,
            }}
            >
                <div ref={printRef}>
                    {selectedResume?.resume && (
                        <ResumeViewer resume={selectedResume} />
                    )}
                </div>
            </div>
            <div className="mt-6 flex justify-end">
                <button onClick={() => setSelectedResume(null)} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                    Close
                </button>
            </div>
        </div>

    );
}
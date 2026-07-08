import { useState } from "react";
import axiosInstance from "../api/axiosInstance";


export default function ResumeAnalyzer(){
    const [file , setFile] = useState(null);
    const [analysis, setAnalysis] = useState(null);

        const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
        alert("Please select a file");
        return;
    }

    const formData = new FormData();

    formData.append("resume", file);

    try {
            const res = await axiosInstance.post(
            "/resume/upload",
            formData
        );

        setAnalysis(res.data.analysis);
        alert("Resume uploaded successfully!");
        console.log(res.data);
        
      } catch (error) {
        console.error(error);
     }
    };
    return(
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                Resume Analyzer
            </h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
                <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files[0])}
                className="mb-4" />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Upload Resume 
                </button> 
            </form>
            {analysis && (
                <div className="mt-8 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-blue-600 text-white rounded-xl p-6 text-center shadow">
                            <h2 className="text-xl font-bold">
                                Resume Scores
                            </h2>

                            <p className="text-5xl font-bold mt-3">
                                {analysis.resumeSxore}
                            </p>
                        </div>

                        <div className="bg-green-600 text-white rounded-xl p-6 text-center shadow">
                            <h2 className="text-xl font-bold">
                                ATS Score
                            </h2>
                            <p className="text-5xl font-bold mt-3">
                                {analysis.atsScore}
                            </p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">
                            Strengths
                        </h2>
                        <ul className="list-disc pl-5 space-y-2">
                            {analysis.strengths?.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">
                            Weaknesses
                        </h2>
                        <ul className="list-disc pl-5 space-y-2">
                            {analysis.weaknesses?.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">
                            Missing Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {analysis.missingSkills?.map((skills) => (
                                <span key={skill} className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">
                            Recommended Roles
                        </h2>
                        <ul className="list-disc pl-5">
                            {analysis.recommendedRoles?.map((role) => (
                                <li key={role}>{role}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">
                            Learning Roadmap
                        </h2>
                        <ol className="list-decimal pl-5 space-y-2">
                            {analysis.roadmap?.map((step) => (
                                <li key={step}>{step}</li>
                            ))}
                        </ol>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">
                            AI Suggestions    
                        </h2>
                        <ul className="list-disc pl-5">
                            {analysis.improvement?.map((item)=> (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white rounded-xl  shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">
                            Summary
                        </h2>
                        <p>
                            {analysis.summary}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
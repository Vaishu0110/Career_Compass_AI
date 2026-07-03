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
        <div className="mt-6 p-4 bg-gray-100 rounded">
            <h2 className="text-xl font-bold mb-2">
            ATS Score
            </h2>

            <p className="text-3xl font-bold text-green-600">{analysis.atsScore}%</p>

            <h3 className="mt-4 font-bold">Skills Found</h3>
            <ul>
                {analysis.skills?.map(skill=>(<li key={skill}>✅ {skill}</li>))}
            </ul>
                <h3 className="mt-4 font-bold">Missing Skills</h3>
            <ul>
                {analysis.missingSkills?.map(skill => (<li key={skill}>❌ {skill}</li>))}
                <h3 className="mt-4 font-bold">Recommended Roles</h3>
                <ul>
                    {analysis.recommendedRoles?.map(role => (<li key={role}>💼{role}</li>))}    
                </ul>
                <h3 className="mt-4 font-bold">Learning Roadmap</h3>
                <ul>
                    {analysis.roadmap?.map(step => (<li key ={step}>📚{step}</li>))}
                </ul>
            </ul>            
        </div>
        )}
        </div>
    )
}
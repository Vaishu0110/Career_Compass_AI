import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function ATSChecker(){
    const [resumeText, setResumeText] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCheckATS = async () => {
        if(!resumeText.trim()){
            alert("Please enter resume text");
            return;
        }

        try{
            setLoading(true);

            const res =await axiosInstance.post("/ats/check", { resumeText, jobDescription, });
            setResult(res.data.result);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-8">
                ATS Resume Checker
            </h1>
            <div className="grid md:grid-cols-2 gap-8">
                {/* INPUT SECTION*/}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">
                        Paste Resume
                    </h2>
                    <textarea value= {resumeText} onChange={(e)=> setResumeText(e.target.value)} rows="18" className="w-full border rounded p-4" placeholder= "Paste your Resume here..."/>   
                    <textarea value={jobDescription} onChange={(e)=>
                        setJobDescription(e.target.value)} rows="6" className="w-full border rounded p-4 mt-4"
                        placeholder="Paste Job Description here..."/>
                    <button onClick={handleCheckATS} disable={loading} className="w-full mt-4 bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
                        {loading ? "Analyzing..." : "Check ATS Score"}
                    </button>
                </div>
                {/* RESULT SECTION */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">
                        ATS Report
                    </h2>
                    {!result ? (
                    <p className="text-gray-500">
                        ATS analysis will appear here.
                    </p>
                    ) : (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h3 className="text-xl font-bold mb-2">
                                    ATS Score
                                </h3>
                                <div className="text-6xl font-bold text-green-600">
                                    {result.score}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">
                                    Missing Keywords
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {result.missingKeywords?.map((keyword, index)=>(<span key={index} className="bg-red-100 text-red-70 px-3 py-1 rounded-full">
                                        {keyword}
                                    </span>
                                    )
                                    )}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">
                                    Strengths                                    
                                </h3>
                                <ul className="list-disc pl-5">
                                   {result.strengths?.map((item, index)=> (<li key={index}>{item}</li>)
                                   )}
                                </ul>
                            </div>
                            <div> 
                                <h3 className="font-bold text-lg mb-2">
                                    Weaknesses
                                </h3>
                                <ul className="list-disc pl-5">
                                    {result.weaknesses?.map((item,index)=> ( <li key={index}>{item}</li>))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">
                                    Suggestions
                                </h3>
                                <ul className="list-disc pl-5">
                                    {result.suggestions?.map((item,index)=>(<li key={index}>{item}</li>))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
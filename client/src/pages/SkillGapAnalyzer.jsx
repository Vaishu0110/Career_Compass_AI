import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function SkillGapAnalyzer(){
    const [skills, setSkills] = useState("");
    const [targetRole, setTargetRole] = useState("");

    const [result,setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const analyzeSkillGap = async () => {
        if(!skills || !targetRole){
            alert("Please fill all fields");
            return;
        }
        try {
            setLoading(true);
            const res= await axiosInstance.post("/skill-gap/analyze",{
                skills, targetRole,}
            );
            setResult(res.data.result);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        < div className="max-w-6xl mx-auto p-6">
            <h1 className= "text - 4xl font-bold text-center mb-8">
                Skill Gap Analyzer
            </h1>
            <div className="grid md:grid-cols-2 gap-8">
                {/*INPUT*/}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">
                        Your Skills
                    </h2>
                    <textarea rows="6" value={skills} onChange={(e)=> setSkills(e.target.value)}
                    placeholder="Enter Your Skills" className="w-full border p-3 rounded "/>
                    <input type="text" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} placeholder="Target Role (Frontend Developer)" className="w-full border p-3 rounded mt-4"/>
                    <button onClick={analyzeSkillGap} disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded mt-4">
                        {loading ? "Analyzing..." : "Analyze Skill Gap" }
                    </button>
                </div>
                {/* RESULT */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">
                        Analysis Result
                    </h2>
                    {!result ? (<p className="text-gray-500">Results will appear here.</p>
                    ) : ( <div className="space-y-6">
                        <div>
                            <h3 className="font-bold text-xl mb-2">
                                Missing Skills
                            </h3>
                            <ul className="list-disc pl-5">
                                {result.missingSkills?.map((skill, index)=>(<li key={index}>{skill}</li>))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-xl mb-2">
                                Learning Roadmap
                            </h3>
                            <ol className="list-decimal pl-5 space-y-1">
                                {result.roadmap?.map((step,index)=>(<li key={index}>{step}</li>))}
                            </ol>
                        </div>
                        {result.estimatedTime && (
                        <div className="bg-blue-50 p-3 rounded mt-4">
                            <strong>Estimated Time:</strong> {result.estimatedTime}
                        </div>
                        )}
                    </div>)}
                </div>
            </div>
        </div>
    );
}
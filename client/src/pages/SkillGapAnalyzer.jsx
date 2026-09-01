import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Target, Wrench, Search, Map, Clock, Save, Sparkles } from "lucide-react";

export default function SkillGapAnalyzer(){
    const [skills, setSkills] = useState("");
    const [targetRole, setTargetRole] = useState("");
    const [roadmapGenerated, setRoadmapGenerated] = useState(false);

    const [result,setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const analyzeSkillGap = async () => {
        if(!skills.trim() || !targetRole.trim()){
            alert("Please fill all fields");
            return;
        }
        try {
            setLoading(true);
            setRoadmapGenerated(false);
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

    const generateRoadmap = async () => {
        if(!result?.missingSkills?.length) {
            alert("Analyze your skill gap first.");
            return;
        }

        try{
            setLoading(true);

            const res = await axiosInstance.post("/roadmap/generate", {
                targetRole,
                missingSkills: result.missingSkills,
            });

            console.log("Generated Roadmap:", res.data);

            setResult(prev => ({
                ...prev,
                roadmap: res.data.result.roadmap,
                estimatedTime: res.data.result.estimatedTime,
            }));

            setRoadmapGenerated(true);

        } catch (error) {
            console.error("Roadmap generation error:", error);
            alert("Failed to generate learning roadmap.");
        } finally {
            setLoading(false);
        }
    };

    const saveRoadmap = async () => {
        if(!result?.roadmap?.length) {
            alert("Generate a roadmap first.");
            return;
        }

        try{
            setLoading(true);

            const res = await axiosInstance.post("/roadmap/save", {
                targetRole,
                currentSkills: skills,
                missingSkills: result.missingSkills || [],
                roadmap: result.roadmap,
                estimatedTime: result.estimatedTime || "Unknown",
            });

            if(res.data.success) {
                alert("Learning roadmap saved successfully.");
            }

        } catch (error) {
            console.error("Save roadmap error:", error);
            alert("Failed to save learning roadmap.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
            
            {/* HERO HEADER */}
            <div className="text-center max-w-3xl mx-auto">
                <span className="inline-flex items-center gap-1.5 bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    <Sparkles size={13} />
                    Career Advancement AI
                </span>
                <h1 className="text-3xl md:text-5xl font-black mt-2 tracking-tight text-slate-900">
                    Skill Gap Analyzer
                </h1>
                <p className="text-slate-500 text-sm md:text-base mt-2">
                    Discover missing skills for your dream role and generate a personalized step-by-step learning journey.
                </p>
            </div>
            {/* INPUT & RESULT GRID */}
            <div className="grid md:grid-cols-2 gap-8">
                
                {/* INPUT SECTION */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-teal-100 flex flex-col justify-between space-y-6">
                    <div>
                        <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-teal-500">
                            <Wrench size={21} />Current Skills & Target Role
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-teal-600 mb-1.5">
                                    Your Current Skills
                                </label>
                                <textarea
                                    rows="7"
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value)}
                                    placeholder="Enter your skills e.g., JavaScript, React, HTML, CSS, Git..."
                                    className="w-full border border-teal-200 bg-white rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed [&::placeholder]:opacity-20 resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-teal-500 mb-1.5">
                                    Desired Target Role
                                </label>
                                <input
                                    type="text"
                                    value={targetRole}
                                    onChange={(e) => setTargetRole(e.target.value)}
                                    placeholder="Target Role e.g., Senior Full Stack Engineer"
                                    className="w-full border border-teal-200 bg-white rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold [&::placeholder]:opacity-20"
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={analyzeSkillGap}
                        disabled={loading || !skills.trim() || !targetRole.trim()}
                        className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-extrabold py-4 rounded-2xl shadow-lg hover:shadow-xl transition transform active:scale-95 text-base flex items-center justify-center gap-2"
                    >
                        <Search size={19} />
                        {loading ? "Analyzing Skill Gaps..." : "Analyze Skill Gap "}
                    </button>
                </div>
                {/* RESULT REPORT SECTION */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-teal-100 flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-teal-500 dark:text-teal-200">
                            Gap Breakdown & Learning Plan
                        </h2>
                        {!result ? (
                            <div className="flex flex-col items-center justify-center h-[380px] text-center p-6 space-y-3 border-2 border-dashed border-teal-100 dark:border-teal-900 rounded-2xl">
                                <div className="w-16 h-16 rounded-3xl bg-teal-50 text-teal-600 flex items-center justify-center">
                                    <Map size={30} />
                                </div>
                                <p className="text-teal-600 text-sm font-medium">
                                    Your missing skills and personalized learning roadmap will appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-fadeIn">
                                
                                {/* TARGET ROLE BADGE */}
                                <div className="bg-teal-50 p-4 rounded-2xl border border-teal-200">
                                    <span className="text-xs font-bold text-teal-800 uppercase tracking-wider block">
                                        Target Position
                                    </span>
                                    <p className="text-lg font-black text-teal-900 mt-1">
                                        {result.targetRole || targetRole}
                                    </p>
                                </div>
                                {/* MISSING SKILLS */}
                                <div>
                                    <h3 className="font-bold text-sm text-teal-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                        <Wrench size={16} /> Missing Skills Required ({result.missingSkills?.length || 0})
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {result.missingSkills?.map((skill, index) => (
                                            <span key={index} className="bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold px-3 py-1.5 rounded-full">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {/* GENERATE ROADMAP BUTTON */}
                                <button
                                    onClick={generateRoadmap}
                                    disabled={loading}
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold py-3.5 rounded-2xl shadow-md transition transform active:scale-95 text-sm flex items-center justify-center gap-2"
                                >
                                    <Sparkles size={17} />
                                    {loading ? "Generating Personalized Roadmap..." : "Generate AI Learning Roadmap"}
                                </button>
                                {/* ROADMAP */}
                                {roadmapGenerated && result.roadmap?.length > 0 && (
                                    <div className="space-y-4 pt-2">
                                        <h3 className="font-bold text-sm text-teal-600 uppercase tracking-wider flex items-center gap-1.5">
                                            Step-by-Step Learning Timeline
                                        </h3>
                                        
                                        <div className="space-y-3">
                                            {result.roadmap.map((step, index) => (
                                                <div key={index} className="bg-teal-50/80 p-4 rounded-2xl border border-gray-200 flex justify-between items-start gap-3">
                                                    <div className="space-y-1">
                                                        <h4 className="font-extrabold text-sm text-slate-900">
                                                            <span className="text-teal-600 dark:text-teal-400 mr-2">#{index + 1}</span> {step.title}
                                                        </h4>
                                                        <p className="text-xs text-teal-700 leading-relaxed">
                                                            {step.description}
                                                        </p>
                                                    </div>
                                                    {step.duration && (
                                                        <span className="text-[11px] bg-teal-100 text-teal-800 font-bold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 flex items-center gap-1">
                                                            <Clock size={12} />
                                                            {step.duration}
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        {/* ESTIMATED TIME */}
                                        {result.estimatedTime && (
                                            <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl text-emerald-900 font-bold text-sm flex items-center justify-between">
                                                <span>Total Estimated Completion:</span>
                                                <span className="text-emerald-700 font-black">{result.estimatedTime}</span>
                                            </div>
                                        )}
                                        {/* SAVE ROADMAP BUTTON */}
                                        <button
                                            onClick={saveRoadmap}
                                            disabled={loading}
                                            className="w-full bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-extrabold py-3.5 rounded-2xl shadow-md transition transform active:scale-95 text-sm flex items-center justify-center gap-2"
                                        >
                                            {loading ? "Saving..." : "Save Learning Roadmap to Profile"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
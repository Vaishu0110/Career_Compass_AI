import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { Loader2, Route } from "lucide-react";

export default function LearningRoadmap()
{
    const[targetRole, setTargetRole]= useState("");
    const[roadmap, setRoadmap]= useState(null);
    const[loading ,setLoading]= useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetchRoadmap();
    }, []);

    const fetchRoadmap = async () => {
        try{
            setFetching(true);

            const res = await axiosInstance.get("/roadmap");

            if(res.data.success && res.data.roadmap) {
                setRoadmap(res.data.roadmap);

                if(res.data.roadmap.targetRole){
                    setTargetRole(res.data.roadmap.targetRole);
                }
            }
        } catch (error)
        {
            console.error("Failed to fetch roadmap:", error.response?.data || error);
        } finally {
            setFetching(false);
        }
    };

    const generateRoadmap = async ()=> {
        if(!targetRole.trim()) {
            alert("Please enter a target role");
            return;
        }
        try{
            setLoading(true);
            const ai = await axiosInstance.post("/roadmap/generate",{ targetRole: targetRole.trim(),});

            const generatedRoadmap = ai.data.result.roadmap;

            if(!Array.isArray(generatedRoadmap) || generatedRoadmap.length === 0) {
                alert("AI failed to generate a valid roadmap.");
                return;
            }

            const saved = await axiosInstance.post("/roadmap/save", {
                targetRole: targetRole.trim(),
                currentSkills: "",
                missingSkills: [],
                estimatedTime: ai.data.result.estimatedTime || "Unknown",
                roadmap: generatedRoadmap,
            });

            if (saved.data.success) {
                setRoadmap(saved.data.roadmap);
            } else {
                alert("Failed to save roadmap.");
            }

        } catch (error) {

            console.error("Roadmap generation error:", error.response?.data || error);

            alert(error.response?.data?.message || "Failed to generate roadmap");
            
        } finally {
            setLoading(false);
        }
    };

    const toggleStep = async (index) => {
        if(!roadmap?.roadmap?.length) {
            return;
        }

        const updatedSteps = roadmap.roadmap.map((step, i) => 
            i=== index ? {...step, completed: !step.completed } : step 
        );
        
        const completed = updatedSteps.filter(
            (step) => step.completed
        ).length;

        const progress = Math.round((completed / updatedSteps.length) * 100);

        const previousRoadmap = roadmap;
        setRoadmap({...roadmap, roadmap: updatedSteps, progress});

        try{
            const res = await axiosInstance.put(`/roadmap/${roadmap._id}`,{
                roadmap: updatedSteps,  
            });
            if (res.data.success) {
                setRoadmap(res.data.roadmap);
            }
        } catch (error) {
            console.error("Failed to update roadmap:", error.response?.data || error);
            setRoadmap(previousRoadmap);
            alert("Failed to update roadmap progress.");
        }
    };

    if(fetching) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="flex items-center gap-3 text-teal-700">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <p className="text-sm font-semibold">
                        Loading your learning roadmap...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
            
            {/* HERO HEADER */}
            <div className="text-center max-w-3xl mx-auto">
                <span className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    <Route className="w-3.5 h-3.5" />
                    Interactive Learning Tracker
                </span>
                <h1 className="text-3xl md:text-5xl font-black mt-2 tracking-tight text-slate-900">
                    Learning Roadmap Generator
                </h1>
                <p className="text-teal-700  text-sm md:text-base mt-3 leading-relaxed font-medium">
                    Generate an AI-powered learning path for your career goal and track your step-by-step progress interactively.
                </p>
            </div>
            {/* INPUT & ROADMAP GRID */}
            <div className="grid md:grid-cols-2 gap-8">
                
                {/* INPUT SECTION */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl border border-teal-100 dark:border-teal-900 flex flex-col justify-between space-y-6">
                    <div>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-teal-800 dark:text-teal-200">
                            <span>🎯</span> Target Career Goal
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                                    Target Position or Technology *
                                </label>
                                <input
                                    type="text"
                                    placeholder="Example: Full Stack MERN Developer, DevOps Engineer"
                                    value={targetRole}
                                    onChange={(e) => setTargetRole(e.target.value)}
                                    className="w-full border border-teal-200 dark:border-teal-800 dark:bg-slate-900 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={generateRoadmap}
                        disabled={loading || !targetRole.trim()}
                        className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 disabled:opacity-50 text-white font-extrabold py-4 rounded-2xl shadow-lg hover:shadow-xl transition transform active:scale-95 text-base"
                    >
                        {loading ? "Building Custom AI Roadmap..." : "Generate AI Learning Roadmap 🚀"}
                    </button>
                </div>
                {/* ROADMAP TRACKER SECTION */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl border border-teal-100 dark:border-teal-900 flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-teal-800 dark:text-teal-200">
                            <span>📈</span> Learning Journey & Progress
                        </h2>
                        {!roadmap ? (
                            <div className="flex flex-col items-center justify-center h-[350px] text-center p-6 space-y-3 border-2 border-dashed border-teal-100 dark:border-teal-900 rounded-2xl">
                                <div className="w-16 h-16 rounded-3xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-300 flex items-center justify-center text-3xl font-bold">
                                    🗺️
                                </div>
                                <p className="text-gray-500 text-sm font-medium">
                                    Enter your career goal on the left to generate your interactive learning roadmap.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-fadeIn">
                                
                                {/* TARGET ROLE BADGE */}
                                <div className="bg-teal-50 dark:bg-teal-950/60 p-4 rounded-2xl border border-teal-200 dark:border-teal-800 flex justify-between items-center">
                                    <div>
                                        <span className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider block">
                                            Current Target Goal
                                        </span>
                                        <p className="text-lg font-black text-teal-900 dark:text-teal-100 mt-0.5">
                                            {roadmap.targetRole}
                                        </p>
                                    </div>
                                    <span className="text-xs bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 font-bold px-3 py-1 rounded-full">
                                        {roadmap.roadmap?.length || 0} Modules
                                    </span>
                                </div>
                                {/* PROGRESS BAR */}
                                <div>
                                    <div className="flex justify-between items-center mb-1.5">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Overall Journey Completion
                                        </span>
                                        <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                                            {roadmap.progress || 0}% Completed
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
                                        <div
                                            className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
                                            style={{ width: `${roadmap.progress || 0}%` }}
                                        />
                                    </div>
                                </div>
                                {/* STEP CHECKBOX LIST */}
                                <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                                    {roadmap.roadmap?.map((step, index) => (
                                        <div
                                            key={step._id || index}
                                            className={`p-4 rounded-2xl border transition duration-200 ${
                                                step.completed
                                                    ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 shadow-sm"
                                                    : "bg-gray-50/80 dark:bg-slate-900/60 border-gray-200 dark:border-slate-700 hover:border-teal-300"
                                            }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={step.completed || false}
                                                    onChange={() => toggleStep(index)}
                                                    className="w-5 h-5 mt-1 text-teal-600 rounded-lg focus:ring-teal-500 cursor-pointer shrink-0 accent-teal-600"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start gap-2">
                                                        <h3
                                                            className={`font-bold text-sm ${
                                                                step.completed
                                                                    ? "line-through text-gray-400 dark:text-gray-500"
                                                                    : "text-gray-900 dark:text-gray-100"
                                                            }`}
                                                        >
                                                            {index + 1}. {step.title}
                                                        </h3>
                                                        {step.duration && (
                                                            <span className="text-[11px] bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
                                                                ⏱️ {step.duration}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {step.description && (
                                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1.5 leading-relaxed">
                                                            {step.description}
                                                        </p>
                                                    )}
                                                    <p className="text-[11px] font-bold mt-2">
                                                        {step.completed ? (
                                                            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                                                <span>✓</span> Completed
                                                            </span>
                                                        ) : (
                                                            <span className="text-gray-400">In Progress</span>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
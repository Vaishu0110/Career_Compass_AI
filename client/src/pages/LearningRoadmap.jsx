import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { Map, Loader2, Route, Target, Sparkles, BarChart3, CheckCircle2, Circle, Clock3 } from "lucide-react";

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
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-teal-100 flex flex-col justify-between space-y-6">
                    <div>
                        <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-teal-500/90">
                            <Target className="w-5 h-5" />
                            Target Career Goal
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-teal-600 mb-1.5">
                                    Target Position or Technology
                                </label>
                                <input
                                    type="text"
                                    placeholder="Example: Full Stack MERN Developer, DevOps Engineer"
                                    value={targetRole}
                                    onChange={(e) => setTargetRole(e.target.value)}
                                    className="w-full border border-teal-200 bg-white rounded-2xl p-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold transition [&::placeholder]:opacity-20"
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={generateRoadmap}
                        disabled={loading || !targetRole.trim()}
                        className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 disabled:opacity-50 text-white font-extrabold py-4 rounded-2xl shadow-lg hover:shadow-xl transition transform active:scale-95 text-base flex items-center justify-center gap-2"
                    >
                        {loading ? (<><Loader2 className="w-5 h-5 animate-spin" /> "Building Custom AI Roadmap..."</>) :( <><Sparkles className="w-5 h-5" /> "Generate AI Learning Roadmap" </>)}
                    </button>
                </div>
                {/* ROADMAP TRACKER SECTION */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-teal-100 flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-teal-500/90">
                            <BarChart3 className="w-5 h-5" />
                            Learning Journey & Progress
                        </h2>
                        {!roadmap ? (
                            <div className="flex flex-col items-center justify-center h-[350px] text-center p-6 space-y-4 border-2 border-dashed border-teal-200  rounded-2xl">
                                <div className="w-16 h-16 rounded-3xl bg-teal-50 text-teal-600 flex items-center justify-center text-3xl font-bold">
                                    <Map className="w-8 h-8" />
                                </div>
                                <p className="text-teal-700 text-sm font-medium max-w-sm leading-relaxed">
                                    Enter your career goal on the left to generate your interactive learning roadmap.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-fadeIn">
                                
                                {/* TARGET ROLE BADGE */}
                                <div className="bg-teal-50 dark:bg-teal-950/60 p-4 rounded-2xl border border-teal-200 dark:border-teal-800 flex justify-between items-center">
                                    <div>
                                        <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
                                            Current Target Goal
                                        </span>
                                        <p className="text-lg font-black text-teal-900 mt-0.1 break-words">
                                            {roadmap.targetRole}
                                        </p>
                                    </div>
                                    <span className="text-xs bg-teal-100 text-teal-800 font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
                                        {roadmap.roadmap?.length || 0} Modules
                                    </span>
                                </div>
                                {/* PROGRESS BAR */}
                                <div>
                                    <div className="flex justify-between items-center mb-1.5">
                                        <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                                            Overall Journey Completion
                                        </span>
                                        <span className="text-sm font-black text-emerald-600">
                                            {roadmap.progress || 0}% Completed
                                        </span>
                                    </div>
                                    <div className="w-full bg-teal-100 h-3 rounded-full overflow-hidden">
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
                                                    ? "bg-emerald-200/80 border-emerald-300 shadow-sm"
                                                    : "bg-emerald-50/80 border-emerald-300 hover:border-emerald-400"
                                            }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleStep(index)}
                                                    className="mt-0.5 shrink-0 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition"
                                                    aria-label={step.completed ? "Mark step incomplete" : "Mark step complete"}
                                                >
                                                    {step.completed ? ( <CheckCircle2 className="w-5 h-5" /> ) : ( <Circle className="w-5 h-5" /> )}
                                                </button>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start gap-2">
                                                        <h3
                                                            className={`font-bold text-sm ${
                                                                step.completed
                                                                    ? "line-through text-slate-900"
                                                                    : "text-slate-900"
                                                            }`}
                                                        >
                                                            {index + 1}.{" "}{step.title}
                                                        </h3>
                                                        {step.duration && (
                                                            <span className="text-[11px] bg-teal-100 text-teal-800 font-bold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 flex items-center gap-1">
                                                                <Clock3 className="w-3 h-3" />{step.duration}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {step.description && (
                                                        <p className="text-xs text-teal-700 mt-1.5 leading-relaxed">
                                                            {step.description}
                                                        </p>
                                                    )}
                                                    <p className="text-[11px] font-bold mt-2">
                                                        {step.completed ? (
                                                            <span className="text-slate-900 flex items-center gap-1">
                                                                <span>✓</span> Completed
                                                            </span>
                                                        ) : (
                                                            <span className="text-slate-900">In Progress</span>
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
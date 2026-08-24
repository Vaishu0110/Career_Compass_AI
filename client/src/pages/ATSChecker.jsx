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
        <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
            <div className="text-center max-w-3xl mx-auto">
                <span className="bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    ATS Keyword Scanner
                </span>
                <h1 className="text-3xl md:text-5xl font-black mt-2 tracking-tight">
                    ATS Resume Checker
                </h1>
                <p className="ext-gray-600 dark:text-gray-300 text-sm md:text-base mt-2">
                    Paste your resume and target job description to check keyword match rates and bypass Automated Tracking Systems.
                </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                {/* INPUT SECTION*/}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl border border-teal-100 dark:border-teal-900 space-y-6 flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-teal-800 dark:text-teal-200">
                            Resume & Job Inputs
                        </h2>

                        <div className="space-y-4">

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                                    Resume Content 
                                </label>
                                <textarea value={resumeText} onChange={(e) => setResumeText(e.target.value)} rows={10} 
                                className="w-full border border-teal-200 dark:border-teal-800 dark:bg-slate-900 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono text-xs leading-relaxed" placeholder="Paste your Resume text" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                                    Target Job Description (Optional)
                                </label>
                                <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} rows={5} 
                                className="w-full border border-teal-200 dark:border-teal-800 dark:bg-slate-900 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono text-xs leading-relaxed" placeholder="Paste your Job Description" />
                            </div>
                        </div>
                    </div>

                    <button onClick={handleCheckATS}
                        disabled={loading || !resumeText.trim()}
                        className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 disabled:opacity-50 text-white font-extrabold py-4 rounded-2xl shadow-lg hover:shadow-xl transition transform active:scale-95 text-base"
                    >
                        {loading ? "Scanning Keywords with ATS Engine..." : "Run ATS Compatibility Check 🚀"}
                    </button>
                </div>
                {/* RESULT REPORT SECTION */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl border border-teal-100 dark:border-teal-900 flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-teal-800 dark:text-teal-200">
                            ATS Compatibility Report
                        </h2>
                        {!result ? (
                            <div className="flex flex-col items-center justify-center h-[400px] text-center p-6 space-y-3 border-2 border-dashed border-teal-100 dark:border-teal-900 rounded-2xl">
                                <div className="w-16 h-16 rounded-3xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-300 flex items-center justify-center text-3xl font-bold">
                                    🎯
                                </div>
                                <p className="text-gray-500 text-sm font-medium">
                                    Your detailed ATS match score and keyword analysis will appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-fadeIn">
                                
                                {/* SCORE GAUGE CARD */}
                                <div className="bg-gradient-to-br from-teal-700 to-emerald-800 text-white rounded-2xl p-6 text-center shadow-lg relative overflow-hidden">
                                    <span className="text-xs font-extrabold uppercase tracking-widest text-teal-200">
                                        Overall ATS Compatibility Score
                                    </span>
                                    <p className="text-6xl font-black mt-2 text-emerald-300">
                                        {result.score}<span className="text-2xl font-normal text-teal-200">/100</span>
                                    </p>
                                    <div className="w-full bg-teal-950/40 h-2 rounded-full mt-4 overflow-hidden">
                                        <div className="bg-emerald-400 h-2 rounded-full transition-all duration-500" style={{ width: `${result.score}%` }} />
                                    </div>
                                </div>
                                {/* MISSING KEYWORDS */}
                                <div>
                                    <h3 className="font-bold text-sm text-gray-700 dark:text-gray-200 uppercase tracking-wider mb-2">
                                        Missing Job Keywords ({result.missingKeywords?.length || 0})
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {result.missingKeywords?.map((keyword, index) => (
                                            <span key={index} className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 border border-red-200 dark:border-red-800 text-xs font-bold px-3 py-1 rounded-full">
                                                + {keyword}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {/* STRENGTHS */}
                                <div>
                                    <h3 className="font-bold text-sm text-emerald-700 dark:text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                        ATS Strengths
                                    </h3>
                                    <ul className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                                        {result.strengths?.map((item, index) => (
                                            <li key={index} className="bg-emerald-50/70 dark:bg-emerald-950/40 p-2.5 rounded-xl border-l-4 border-emerald-500 font-medium">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* WEAKNESSES */}
                                <div>
                                    <h3 className="font-bold text-sm text-amber-700 dark:text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                        Optimization Gaps
                                    </h3>
                                    <ul className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                                        {result.weaknesses?.map((item, index) => (
                                            <li key={index} className="bg-amber-50/70 dark:bg-amber-950/40 p-2.5 rounded-xl border-l-4 border-amber-500 font-medium">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* SUGGESTIONS */}
                                <div>
                                    <h3 className="font-bold text-sm text-teal-700 dark:text-teal-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                        AI Recommendations
                                    </h3>
                                    <ul className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                                        {result.suggestions?.map((item, index) => (
                                            <li key={index} className="bg-teal-50/70 dark:bg-teal-950/40 p-2.5 rounded-xl border-l-4 border-teal-500 font-medium">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
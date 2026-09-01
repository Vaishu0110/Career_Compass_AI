import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Target, FileText, Search, CheckCircle, AlertCircle, Lightbulb, Sparkles } from "lucide-react";

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
                <span className="inline-flex items-center gap-1.5 bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    <Sparkles size={13} />
                    ATS Keyword Scanner
                </span>
                <h1 className="text-3xl md:text-5xl font-black mt-2 tracking-tight text-slate-900">
                    ATS Resume Checker
                </h1>
                <p className="text-slate-500 text-sm md:text-base mt-2">
                    Paste your resume and target job description to check keyword match rates and bypass Automated Tracking Systems.
                </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                {/* INPUT SECTION*/}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-teal-100 space-y-6 flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-teal-600">
                            Resume & Job Inputs
                        </h2>

                        <div className="space-y-4">

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-teal-200/80 mb-1.5">
                                    Resume Content 
                                </label>
                                <textarea value={resumeText} onChange={(e) => setResumeText(e.target.value)} rows={10} 
                                className="w-full border border-teal-200 bg-white rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 [&::placeholder]:opacity-20 leading-relaxed" placeholder="Paste your Resume text" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-teal-200/80 mb-1.5">
                                    Target Job Description (Optional)
                                </label>
                                <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} rows={5} 
                                className="w-full border border-teal-200 bg-white rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 [&::placeholder]:opacity-20 leading-relaxed" placeholder="Paste your Job Description" />
                            </div>
                        </div>
                    </div>

                    <button onClick={handleCheckATS}
                        disabled={loading || !resumeText.trim()}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-extrabold py-4 rounded-2xl shadow-lg hover:shadow-xl transition transform active:scale-95 text-base flex items-center justify-center gap-2"
                    >
                        <Search size={19} />
                        {loading ? "Scanning Keywords with ATS Engine..." : "Run ATS Compatibility Check"}
                    </button>
                </div>
                {/* RESULT REPORT SECTION */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-teal-100 flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-teal-600">
                            ATS Compatibility Report
                        </h2>
                        {!result ? (
                            <div className="flex flex-col items-center justify-center h-[400px] text-center p-6 space-y-3 border-2 border-dashed border-teal-100 rounded-2xl">
                                <div className="w-16 h-16 rounded-3xl bg-teal-50 text-teal-600 flex items-center justify-center">
                                    <Target size={30} />
                                </div>
                                <p className="text-teal-600 text-sm font-medium">
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
                                    <h3 className="font-bold text-sm text-teal-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                        <AlertCircle size={16} />
                                        Missing Job Keywords ({result.missingKeywords?.length || 0})
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {result.missingKeywords?.map((keyword, index) => (
                                            <span key={index} className="bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold px-3 py-1.5 rounded-full">
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {/* STRENGTHS */}
                                <div>
                                    <h3 className="font-bold text-sm text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                        <CheckCircle size={16} />
                                        ATS Strengths
                                    </h3>
                                    <ul className="space-y-1.5 text-xs text-teal-700">
                                        {result.strengths?.map((item, index) => (
                                            <li key={index} className="bg-emerald-50/70 p-2.5 rounded-xl border-l-4 border-emerald-500 font-medium">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* WEAKNESSES */}
                                <div>
                                    <h3 className="font-bold text-sm text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                        <AlertCircle size={16} />
                                        Optimization Gaps
                                    </h3>
                                    <ul className="space-y-1.5 text-xs text-teal-700">
                                        {result.weaknesses?.map((item, index) => (
                                            <li key={index} className="bg-emerald-50/70 p-2.5 rounded-xl border-l-4 border-emerald-500 font-medium">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* SUGGESTIONS */}
                                <div>
                                    <h3 className="font-bold text-sm text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                        <Lightbulb size={16} />
                                        AI Recommendations
                                    </h3>
                                    <ul className="space-y-1.5 text-xs text-teal-700">
                                        {result.suggestions?.map((item, index) => (
                                            <li key={index} className="bg-emerald-50/70 p-2.5 rounded-xl border-l-4 border-emerald-500 font-medium">
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
// client/src/pages/ResumeAnalyzer.jsx
import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { FileText, Upload, Brain, CheckCircle2, AlertCircle, Target, Briefcase, Download, FileDown, Sparkles } from "lucide-react";


export default function ResumeAnalyzer() {
    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please select a file to analyze.");
            return;
        }

        const formData = new FormData();
        formData.append("resume", file);

        try {
            setLoading(true);
            const res = await axiosInstance.post("/resume/upload", formData);
            setAnalysis(res.data.analysis);
            alert("Resume analyzed successfully!");
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to analyze resume.");
        } finally {
            setLoading(false);
        }
    };

    const downloadReport = async () => {
        try {
            const response = await axiosInstance.get("/resume/download-report", {
                responseType: "blob",
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "Resume-Analysis.docx");
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error(error);
            alert("Failed to download DOCX report.");
        }
    };

    const downloadPDF = async () => {
        try {
            const res = await axiosInstance.get("/resume/download-report/pdf", {
                responseType: "blob",
            });
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.download = "Resume-Analysis.pdf";
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
            alert("Failed to download PDF report.");
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
            
            {/* HERO HEADER */}
            <div className="text-center max-w-3xl mx-auto">
                <span className="inline-flex items-center gap-1.5 bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    <Brain size={13} />
                    AI Intelligence Suite
                </span>
                <h1 className="text-3xl md:text-5xl font-black mt-3 tracking-tight text-slate-900">
                    AI Resume Analyzer 
                </h1>
                <p className="text-teal-700 text-sm md:text-base mt-2">
                    Upload your resume to get instant ATS scores, breakdown of strengths & weaknesses, and actionable career suggestions.
                </p>
            </div>

            {/* DRAG AND DROP FILE UPLOAD CARD */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-teal-100 max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="border-2 border-dashed border-teal-300 hover:border-teal-500 bg-teal-50/50 rounded-2xl p-8 text-center cursor-pointer transition duration-200 relative">
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="space-y-3 pointer-events-none">
                            <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
                                {file ? ( <FileText size={28} /> ) : ( <Upload size={28} /> )}
                            </div>
                            {file ? (
                                <div>
                                    <p className="text-teal-700 font-extrabold text-base break-all">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-teal-600 mt-1">
                                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-base font-bold text-teal-800">
                                        Click to browse or drop your resume file here
                                    </p>
                                    <p className="text-xs text-teal-600 mt-1">
                                        Supports PDF, DOC, and DOCX (Max 10MB)
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !file}
                        className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold py-4 rounded-2xl shadow-lg hover:shadow-xl transition transform active:scale-95 text-base flex items-center justify-center gap-2"
                    >
                        {loading ?<> <Brain size={19} className="animate-pulse" /> Analyzing Resume with AI... </>: <> <Sparkles size={19} /> Upload & Analyze Resume </>}
                    </button>
                </form>
            </div>

            {/* ANALYSIS RESULTS SECTION */}
            {analysis && (
                <div className="space-y-8 animate-fadeIn">
                    
                    {/* DUAL SCORE GAUGE CARDS */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-teal-700 to-teal-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden text-center">
                            
                            <div className="flex items-center justify-center gap-2 text-teal-200">
                                <FileText size={17} />
                                <span className="text-xs font-extrabold uppercase tracking-widest text-teal-200">
                                    Overall Quality Score
                                </span>
                            </div>

                            <p className="text-6xl font-black mt-3 text-emerald-300">
                                {analysis.resumeScore}<span className="text-2xl font-normal text-teal-200">/100</span>
                            </p>
                            <p className="text-xs text-teal-100 mt-2 font-medium">Evaluated across structure, content & grammar</p>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-600 to-teal-800 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden text-center">
                            
                            <div className="flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-widest">
                                <Target size={17} />
                                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-200">
                                    ATS Match Rate
                                </span>
                            </div>

                            <p className="text-6xl font-black mt-3 text-teal-200">
                                {analysis.atsScore}<span className="text-2xl font-normal text-emerald-200">%</span>
                            </p>
                            <p className="text-xs text-emerald-100 mt-2 font-medium">Compatibility with Automated Keyword Systems</p>
                        </div>
                    </div>

                    {/* SIDE-BY-SIDE STRENGTHS VS WEAKNESSES */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* STRENGTHS */}
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-md border border-emerald-100">
                            <h2 className="text-xl font-bold mb-4 text-emerald-500 flex items-center gap-2">
                                <CheckCircle2 size={20} />
                                Key Strengths
                            </h2>
                            <ul className="space-y-2.5">
                                {analysis.strengths?.map((item, idx) => (
                                    <li key={idx} className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-100 text-sm font-medium text-emerald-900">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* WEAKNESSES */}
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-md border border-emerald-100">
                            <h2 className="text-xl font-bold mb-4 text-emerald-500 flex items-center gap-2">
                                <AlertCircle size={20} />
                                Areas for Improvement
                            </h2>
                            <ul className="space-y-2.5">
                                {analysis.weaknesses?.map((item, idx) => (
                                    <li key={idx} className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-100 text-sm font-medium text-emerald-900">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* MISSING SKILLS & RECOMMENDED ROLES */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-3xl p-6 shadow-md border border-teal-100">
                            <h2 className="text-xl font-bold mb-4 text-teal-500 flex items-center gap-2">
                                <Target size={20} />
                                Missing Key Skills
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {analysis.missingSkills?.map((skill, idx) => (
                                    <span key={idx} className="bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold px-3 py-1.5 rounded-xl">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-md border border-teal-100">
                            <h2 className="text-xl font-bold mb-4 text-teal-500 flex items-center gap-2">
                                <Briefcase size={20} />
                                Best Matching Roles
                            </h2>
                            <ul className="space-y-2">
                                {analysis.recommendedRoles?.map((role, idx) => (
                                    <li key={idx} className="bg-teal-50/60 px-3.5 py-2 rounded-xl text-sm font-semibold text-teal-900 border border-teal-100">
                                        {role}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* EXECUTIVE SUMMARY */}
                    <div className="bg-white  rounded-3xl p-6 shadow-md border border-teal-100">
                        <h2 className="text-xl font-bold mb-3 text-teal-400 flex items-center gap-2">
                            <Brain size={20} />
                            AI Executive Summary
                        </h2>
                        <p className="text-teal-500 leading-relaxed text-sm md:text-base">
                            {analysis.summary}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
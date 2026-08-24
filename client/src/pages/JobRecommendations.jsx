import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function JobRecommendations(){
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        fetchRecommendations();
    }, []);

    const fetchRecommendations = async () => {
        try {
            const res = await axiosInstance.get("/job-recommendations");

            console.log("Job recommendation response:", res.data);

            if (res.data.success) {
                setJobs(res.data.recommendations || []);
            } else {
                console.error("Recommendation API failed:", res.data.message);
                setJobs([]);
            }

        } catch (error) {
            console.error(
                "Failed to fetch recommendations:",
                error.response?.data || error
            );

            alert(
                error.response?.data?.message ||
                "Failed to load recommendations."
            );

            setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    const saveJob = async (job) => {
        try{
            await axiosInstance.post("/jobs/save", {
                title: job.title,
                company: job.company,
                location: job.location,
                salary: job.salary,
                matchScore: job.matchScore,
                skillsMatched: job.skillsMatched,
                missingSkills: job.missingSkills,
                reason: job.reason,
            });

            alert("Job saved successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to save job.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="text-xl font-semibold">
                    AI is generating your personalised job recommendations...
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
            
            {/* HERO HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-teal-100 dark:border-teal-900 pb-6">
                <div>
                    <span className="bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Tailored Career Matching
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black mt-2 tracking-tight">
                        AI Job Recommendations 🚀
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base mt-1">
                        Personalized job openings matched against your resume skills and target career trajectory.
                    </p>
                </div>
                <button
                    onClick={fetchRecommendations}
                    className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold px-5 py-3 rounded-2xl shadow-md transition transform active:scale-95 text-xs uppercase tracking-wider flex items-center gap-2 shrink-0"
                >
                    <span>🔄</span> Refresh Recommendations
                </button>
            </div>
            {/* JOB CARDS GRID */}
            {jobs.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center border border-teal-100 dark:border-teal-900 shadow-xl max-w-xl mx-auto space-y-3">
                    <div className="w-16 h-16 rounded-3xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-300 flex items-center justify-center text-3xl font-bold mx-auto">
                        💼
                    </div>
                    <h2 className="text-xl font-bold">No Job Recommendations Found</h2>
                    <p className="text-xs text-gray-500 max-w-md mx-auto">
                        Upload or analyze your resume in Resume Analyzer first to receive personalized AI job matches.
                    </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {jobs.map((job, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-teal-100 dark:border-teal-900 flex flex-col justify-between hover:border-teal-400 transition duration-200"
                        >
                            <div className="space-y-4">
                                
                                {/* CARD HEADER: TITLE & MATCH SCORE */}
                                <div className="flex justify-between items-start gap-3">
                                    <div>
                                        <h2 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 leading-snug">
                                            {job.title}
                                        </h2>
                                        <p className="text-sm font-bold text-teal-700 dark:text-teal-300 mt-0.5">
                                            🏢 {job.company}
                                        </p>
                                    </div>
                                    {/* MATCH SCORE PILL */}
                                    <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 text-xs font-black px-3 py-1.5 rounded-full shrink-0 shadow-sm">
                                        {job.matchScore}% Match
                                    </span>
                                </div>
                                {/* LOCATION & SALARY META */}
                                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500 border-y border-gray-100 dark:border-slate-700/60 py-2.5">
                                    <span>📍 {job.location || "Remote / Various"}</span>
                                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                                        💰 {job.salary || "Competitive"}
                                    </span>
                                </div>
                                {/* SKILLS MATCHED */}
                                <div>
                                    <h3 className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                                        <span>✓</span> Matched Skills ({job.skillsMatched?.length || 0})
                                    </h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {job.skillsMatched?.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full"
                                            >
                                                ✓ {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {/* MISSING SKILLS */}
                                {job.missingSkills?.length > 0 && (
                                    <div>
                                        <h3 className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                                            <span>⚠️</span> Missing Skills
                                        </h3>
                                        <div className="flex flex-wrap gap-1.5">
                                            {job.missingSkills?.map((skill, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 border border-red-200 dark:border-red-800 text-[11px] font-bold px-2.5 py-1 rounded-full"
                                                >
                                                    + {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {/* AI MATCH REASON CALLOUT */}
                                {job.reason && (
                                    <div className="bg-teal-50/70 dark:bg-teal-950/40 p-3.5 rounded-2xl border border-teal-200 dark:border-teal-800">
                                        <span className="text-[10px] font-extrabold text-teal-800 dark:text-teal-300 uppercase tracking-wider block mb-0.5">
                                            💡 AI Match Rationale
                                        </span>
                                        <p className="text-xs text-teal-950 dark:text-teal-100 font-medium leading-relaxed">
                                            {job.reason}
                                        </p>
                                    </div>
                                )}
                            </div>
                            {/* SAVE JOB BUTTON */}
                            <button
                                onClick={() => saveJob(job)}
                                className="w-full mt-6 bg-teal-700 hover:bg-teal-800 text-white font-extrabold py-3.5 rounded-2xl shadow-md transition transform active:scale-95 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                            >
                                <span>💾</span> Save Job to Tracker
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
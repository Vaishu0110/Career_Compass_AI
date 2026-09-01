import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { RefreshCw, Briefcase, Building2, MapPin, Check, AlertTriangle, Lightbulb, Save, IndianRupee } from "lucide-react";

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
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <RefreshCw className="w-8 h-8 text-teal-600 animate-spin" />

                    <p className="text-lg font-semibold text-teal-800 dark:text-teal-200">
                        AI is generating your personalised job recommendations...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
            
            {/* HERO HEADER */}
            <div className="text-center max-w-3xl mx-auto">
                
                <span className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    <Briefcase className="w-3.5 h-3.5" />
                    Tailored Career Matching
                </span>
                <h1 className="text-3xl md:text-5xl font-black mt-2 tracking-tight text-slate-900">
                    AI Job Recommendations
                </h1>
                <p className="text-teal-700 text-sm md:text-base mt-1">
                    Personalized job openings matched against your resume skills and target career trajectory.
                </p>
            </div>
            <div className="flex justify-center">
                    <button
                        onClick={fetchRecommendations} disabled={loading}
                        className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold px-5 py-3 rounded-2xl shadow-md transition transform active:scale-95 text-xs uppercase tracking-wider flex items-center gap-2 shrink-0"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Refresh Recommendations
                    </button>
                </div>
            {/* JOB CARDS GRID */}
            {jobs.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-teal-100 shadow-xl max-w-xl mx-auto space-y-4">
                    <div className="w-16 h-16 rounded-3xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
                        <Briefcase className="w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">No Job Recommendations Found</h2>
                    <p className="text-xs text-teal-700 max-w-md mx-auto">
                        Upload or analyze your resume in Resume Analyzer first to receive personalized AI job matches.
                    </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {jobs.map((job, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-teal-100 flex flex-col justify-between hover:border-teal-400 transition duration-200"
                        >
                            <div className="space-y-4">
                                
                                {/* CARD HEADER: TITLE & MATCH SCORE */}
                                <div className="flex justify-between items-start gap-3">
                                    <div>
                                        <h2 className="text-xl font-extrabold text-teal-400 leading-snug">
                                            {job.title}
                                        </h2>
                                        <p className="text-sm font-bold text-teal-500 mt-1 flex items-center gap-1.5">
                                            <Building2 className="w-4 h-4 shrink-0" />
                                            {job.company}
                                        </p>
                                    </div>
                                    {/* MATCH SCORE PILL */}
                                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-black px-3 py-1.5 rounded-full shrink-0 shadow-sm">
                                        {job.matchScore}% Match
                                    </span>
                                </div>
                                {/* LOCATION & SALARY META */}
                                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-teal-500 border-y border-teal-100 py-2.5">
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {job.location || "Remote / Various"}
                                    </span>
                                    <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                                        {job.salary || "Competitive"}
                                    </span>
                                </div>
                                {/* SKILLS MATCHED */}
                                <div>
                                    <h3 className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                                        <Check className="w-3.5 h-3.5" />
                                        Matched Skills ({job.skillsMatched?.length || 0})
                                    </h3>

                                    <div className="flex flex-wrap gap-1.5">
                                        {job.skillsMatched?.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                                            >
                                                <Check className="w-3 h-3" />
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {/* MISSING SKILLS */}
                                {job.missingSkills?.length > 0 && (
                                    <div>
                                        <h3 className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                                            <AlertTriangle className="w-3.5 h-3.5" />
                                            Missing Skills
                                        </h3>
                                        <div className="flex flex-wrap gap-1.5">
                                            {job.missingSkills?.map((skill, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-teal-50 text-teal-700 border border-teal-200 text-[11px] font-bold px-2.5 py-1 rounded-full"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {/* AI MATCH REASON CALLOUT */}
                                {job.reason && (
                                    <div className="bg-teal-50/70 p-3.5 rounded-2xl border border-teal-200">
                                        <span className="text-[10px] font-extrabold text-teal-800 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                                            <Lightbulb className="w-3.5 h-3.5" />
                                            AI Match Rationale
                                        </span>
                                        <p className="text-xs text-teal-950 font-medium leading-relaxed">
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
                                <Save className="w-4 h-4" />
                                Save Job to Tracker
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
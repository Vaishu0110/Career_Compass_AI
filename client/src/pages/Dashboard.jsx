import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardCharts from "../components/DashboardCharts";
import axiosInstance from "../api/axiosInstance";

export default function Dashboard(){
    const [stats, setStats] = useState(null);

    useEffect (() => {
        fetchDashboard();
    },[]);
    const fetchDashboard = async () => {
        try {
            const res = await axiosInstance.get("/dashboard");
            setStats(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    if(!stats) {

        return(
            <div className="flex justify-center items-center h-[70vh]">
                <div className="text-xl font-bold text-teal-700 dark:text-teal-300 animate-pulse">
                    Loading Dashboard...
                </div>
            </div>
        );
    }
    return (
        <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
            <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center hap-6">
                    <div>
                        <span className="bg-teal-900/40 text-teal-100 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-teal-400/30">
                            Career Compass AI Dashboard
                        </span>
                        <h1 className="text-3xl md:text-5xl font-extrabold mt-3 tracking-tight">
                            Welcome back, {stats?.name || "Candidate"}
                        </h1>
                        <p className="text-teal-100 text-base md:text-lg mt-2 font-medium">
                            Target Role: <span className="underline decoration-teal-300 font-bold">
                                    {stats?.targetRole || "Not Specified"}
                                </span>
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Link to="/career-coach" className="bg-emerald-500 hover:bg-emerald-400 text-white px-5 py-3 rounded-xl font-bold transition shadow-lg text-sm">
                            Ask AI Coach
                        </Link>
                    </div>
                </div>
            </div>

            {/* Dashboard Stats */}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-md border border-teal-100 relative">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-teal-500">
                            Resume Strength
                        </span>
                        <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2.5 py-1 rounded-full">
                            Score
                        </span>
                    </div>
                    <p className="text-4xl font-extrabold text-teal-400 mt-3">
                        {stats.resumeScore || 0}<span className="text-base text-teal-600 font-normal">/100</span>
                    </p>
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
                        <div className="bg-teal-500 h-2 rounded-full transition-all duration-500" style={{ width: `${stats.resumeScore || 0}%` }} />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-teal-100 relative">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-emerald-500">
                            ATS Match Rate
                        </span>
                        <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2.5 py-1 rounded-full">
                            Optimization
                        </span>
                    </div>
                    <p className="text-4xl font-extrabold text-emerald-400 mt-3">
                        {stats.atsScore || 0}<span className="text-base text-emerald-600 font-normal">%</span>
                    </p>
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
                        <div className="bg-emerald-500 h-2 rounded-full transition-all duration-500" style={{ width: `${stats.atsScore || 0}%` }} />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-teal-100 relative">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-teal-500">
                           Mock Interview Score
                        </span>
                        <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2.5 py-1 rounded-full">
                            Readiness
                        </span>
                    </div>
                    <p className="text-4xl font-extrabold text-teal-400 mt-3">
                        {stats.interviewScore || 0}<span className="text-base text-teal-600 font-normal">/100</span>
                    </p>
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
                        <div className="bg-teal-500 h-2 rounded-full transition-all duration-500" style={{ width: `${stats.resumeScore || 0}%` }} />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-teal-100 relative">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-emerald-500">
                            Roadmap Progress
                        </span>
                        <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2.5 py-1 rounded-full">
                           Journey
                        </span>
                    </div>
                    <p className="text-4xl font-extrabold text-emerald-400 mt-3">
                        {stats.learningProgress || 0}<span className="text-base text-emerald-600 font-normal">%</span>
                    </p>
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
                        <div className="bg-emerald-500 h-2 rounded-full transition-all duration-500" style={{ width: `${stats.learningProgress || 0}%` }} />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md border border-teal-100 dark:border-teal-900">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-teal-500" />
                    Application Pipeline Metrics
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
                    <div className="bg-emerald-100/90 dark:bg-emerald-900/60 p-5 rounded-2xl border border-emerald-300 dark:border-emerald-600/80 shadow-sm hover:shadow-md transition">
                        <span className="text-xs text-teal-800 dark:text-teal-200 font-bold uppercase">Resumes</span>
                        <p className="text-2xl font-extrabold text-teal-700 dark:text-teal-300 mt-1">{stats.resumeCount || 0}</p>
                    </div>

                    <div className="bg-emerald-100/90 dark:bg-emerald-900/60 p-5 rounded-2xl border border-emerald-300 dark:border-emerald-600/80 shadow-sm hover:shadow-md transition">
                        <span className="text-xs text-teal-800 dark:text-teal-200 font-bold uppercase">Applied</span>
                        <p className="text-2xl font-extrabold text-teal-700 dark:text-teal-300 mt-1">{stats.applied || 0}</p>
                    </div>

                    <div className="bg-emerald-100/90 dark:bg-emerald-900/60 p-5 rounded-2xl border border-emerald-300 dark:border-emerald-600/80 shadow-sm hover:shadow-md transition">
                        <span className="text-xs text-emerald-800 dark:text-emerald-200 font-bold uppercase">Interviews</span>
                        <p className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300 mt-1">{stats.interview || 0}</p>
                    </div>

                    <div className="bg-emerald-100/90 dark:bg-emerald-900/60 p-5 rounded-2xl border border-emerald-300 dark:border-emerald-600/80 shadow-sm hover:shadow-md transition">
                        <span className="text-xs text-emerald-800 dark:text-emerald-200 font-bold uppercase">Offer</span>
                        <p className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300 mt-1">{stats.offer || 0}</p>
                    </div>

                    <div className="bg-emerald-100/90 dark:bg-emerald-900/60 p-5 rounded-2xl border border-emerald-300 dark:border-emerald-600/80 shadow-sm hover:shadow-md transition">
                        <span className="text-xs text-emerald-800 dark:text-emerald-200 font-bold uppercase">Skill Gap</span>
                        <p className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300 mt-1">{stats.skillGap || 0}</p>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    AI Career Suite & Tools
                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <Link to="/resume-analyzer">
                        <div className="p-6 bg-white rounded-2xl shadow-md border border-teal-100 hover:-translate-y-1 hover:border-teal-500 transition duration-200 group">
                            <h3 className="text-lg text-teal-400 font-bold">Resume Analyzer</h3>
                            <p className="text-xs text-teal-600 mt-1">Get AI Resume Feedback and ATS score optimization.</p>
                        </div>
                    </Link>

                    <Link to="/resume-generator">
                        <div className="p-6 bg-white rounded-2xl shadow-md border border-teal-100 hover:-translate-y-1 hover:border-teal-500 transition duration-200 group">
                            <h3 className="text-lg text-teal-400 font-bold">Resume Builder</h3>
                            <p className="text-xs text-teal-600 mt-1">Generate professional, ATS-ready resumes with AI.</p>
                        </div>
                    </Link>

                    <Link to="/ats-checker">
                        <div className="p-6 bg-white rounded-2xl shadow-md border border-teal-100 hover:-translate-y-1 hover:border-teal-500 transition duration-200 group">
                            <h3 className="text-lg text-teal-400 font-bold">ATS Checker</h3>
                            <p className="text-xs text-teal-600 mt-1">Test your resume against job description keywords.</p>
                        </div>
                    </Link>

                    <Link to="/skill-gap">
                        <div className="p-6 bg-white rounded-2xl shadow-md border border-teal-100 hover:-translate-y-1 hover:border-teal-500 transition duration-200 group">
                            <h3 className="text-lg text-teal-400 font-bold">Skill Gap Analyzer</h3>
                            <p className="text-xs text-teal-600 mt-1">Find missing skills required for your target role.</p>
                        </div>
                    </Link>

                    <Link to="/learning-roadmap">
                        <div className="p-6 bg-white rounded-2xl shadow-md border border-teal-100 hover:-translate-y-1 hover:border-teal-500 transition duration-200 group">
                            <h3 className="text-lg text-teal-400 font-bold">Learning Roadmap</h3>
                            <p className="text-xs text-teal-600 mt-1">Track your personalized step-by-step learning plan.</p>
                        </div>
                    </Link>

                    <Link to="/interview-simulator">
                        <div className="p-6 bg-white rounded-2xl shadow-md border border-teal-100 hover:-translate-y-1 hover:border-teal-500 transition duration-200 group">
                            <h3 className="text-lg text-teal-400 font-bold">Interview Simulator</h3>
                            <p className="text-xs text-teal-600 mt-1">Practice AI mock interviews with instant scoring.</p>
                        </div>
                    </Link>

                    <Link to="/job-tracker">
                        <div className="p-6 bg-white rounded-2xl shadow-md border border-teal-100 hover:-translate-y-1 hover:border-teal-500 transition duration-200 group">
                            <h3 className="text-lg text-teal-400 font-bold">Job Tracker</h3>
                            <p className="text-xs text-teal-600 mt-1">Manage applications, interviews, and job offers.</p>
                        </div>
                    </Link>

                    <Link to="/job-recommendations">
                        <div className="p-6 bg-white rounded-2xl shadow-md border border-teal-100 hover:-translate-y-1 hover:border-teal-500 transition duration-200 group">
                            <h3 className="text-lg text-teal-400 font-bold">Job Matches</h3>
                            <p className="text-xs text-teal-600 mt-1">Explore personalized AI-matched job opportunities.</p>
                        </div>
                    </Link>

                </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md border border-teal-10">
                <DashboardCharts stats={stats} />
            </div>
        </div>
    );
}
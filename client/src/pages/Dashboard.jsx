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
    return (
        <div className="p-8">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold">
                    Welcome back{stats?.name ? `, ${stats.name}` : "" } 👋
                </h1>
                <p className="text-gray-600 mt-2">
                    {stats?.targetRole ? `Target Role: ${stats.targetRole}` : "Let's build your career together!"}
                </p>
            </div>
            <div className="flex justify-end mb-6">
                <Link to="/edit-profile" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Edit Profile
                </Link>
            </div>

            {/* Dashboard Stats */}
            {stats &&(
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10">
                    <div className="bg-blue-600 text-white rounded-lg p-5 shadow">
                        <h2 className="text-lg">
                            Resume Score
                        </h2>
                        <p className="text-4xl font-bold mt-2">
                            {stats.resumeScore}
                        </p>
                    </div>

                    <div className="bg-green-600 text-white rounded-lg p-5 shadow">
                        <h2 className="text-lg">
                            ATS Score
                        </h2>
                        <p className="text-4xl font-bold mt-2">
                            {stats.atsScore}
                        </p>
                    </div>

                    <div className="bg-indigo-600 text-white rounded-lg p-5 shadow">
                        <h2 className="text-lg">
                            Resumes Uploaded    
                        </h2>
                        <p className="text-4xl font-bold mt-2">
                            {stats.resumeCount}
                        </p>
                    </div>

                    <div className="bg-yellow-500 text-white rounded-lg p-5 shadow">
                        <h2 className="text-lg">
                            Applications
                        </h2>
                        <p className="text-4xl font-bold mt-2">
                            {stats.applied}
                        </p>
                    </div>

                    <div className="bg-purple-600 text-white rounded-lg p-5 shadow">
                        <h2 className="text-lg">
                            Interviews    
                        </h2>
                        <p className="text-4xl font-bold mt-2">
                            {stats.interview}
                        </p>
                    </div>
                </div>
            )}

            {stats && (
                <div className="bg-white rounded-xl shadow p-6 mb-10">
                    <h2 className="text-2xl font-bold mb-4">
                        Career Summary
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <p>
                            🎯 <strong>Target Role:</strong> {stats.targetRole || "Not Set"}
                        </p>
                        <p>
                            📄 <strong>Resume Count:</strong> {stats.resumeCount}
                        </p>
                        <p>
                            🤖 <strong>ATS Analyses:</strong> {stats.analysesCount}
                        </p>
                        <p>
                            💼 <strong>Applications:</strong> {stats.applied}
                        </p>
                    </div>
                </div>
            )}

            {/* Feature Cards */}
            <div className="grid md:grid-cols-5 gap-6">
                <Link to="/resume-analyzer">
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition">
                        <h2 className="text-2xl font-bold">
                            Resume Analyzer
                        </h2>
                        <p>
                            Analyze resume, generate ATS score and improve weaknesses.
                        </p>
                    </div>
                </Link>

                <Link to="/resume-generator">
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition">
                        <h2 className="text-2xl font-bold">
                            Resume Generator
                        </h2>
                        <p>
                            Generate ATS friendly resumes.
                        </p>
                    </div>
                </Link>

                <Link to="/ats-checker">
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition">
                        <h2 className="text-2xl font-bold">
                            ATS Checker
                        </h2>
                        <p>
                            Check ATS compability of resume.
                        </p>
                    </div>
                </Link>

                <Link to="/skill-gap">
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition">
                        <h2 className="text-2xl font-bold">
                            Skill Gap Analyzer
                        </h2>
                        <p>
                            Discover missing skills and learning roadmap.
                        </p>
                    </div> 
                </Link>

                <Link to="/learning-roadmap">
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition">
                        <h2 className="text-2xl font-bold">
                            Learning Roadmap
                        </h2>
                        <p>
                            Follow your personalized learning journey.
                        </p>
                    </div>
                </Link>

                <Link to="/interview-simulator">
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition">
                        <h2 className="text-2xl font-bold">
                            Interview Simulator
                        </h2>
                        <p>
                            Practice technical and HR interviews.
                        </p>
                    </div>
                </Link>

                <Link to="/job-tracker">
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition">
                        <h2 className="text-2xl font-bold">
                            Job Tracker
                        </h2>
                        <p>
                            Track job applications and interviews.
                        </p>
                    </div>
                </Link>

                <Link to="/career-coach">
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition">
                        <h2 className="text-2xl font-bold">
                            AI Career Coach
                        </h2>
                        <p>
                            Chat with your personal AI mentor.
                        </p>
                    </div>
                </Link>
                <Link to="/resume-history">
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition">
                        <h2 className="text-2xl font-bold">
                            Resume History
                        </h2>

                        <p>
                            View all uploaded resumes and ATS reports
                        </p>
                    </div>
                </Link>

                <Link to="/my-resumes">
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition">
                        <h2 className="text-2xl font-bold">
                            My Resumes
                        </h2>

                        <p>
                            View, edit and download your AI generated resumes.
                        </p>
                    </div>
                </Link>

                <Link to="/job-recommendations">
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition">
                        <h2 className="text-2xl font-bold">
                            AI Job Recommendations
                        </h2>

                        <p>
                            Discover personalized job opportunities.
                        </p>
                    </div>
                </Link>

                <Link to="/interview-history">
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition">
                        <h2 className="text-2xl font-bold">
                            Interview History
                        </h2>

                        <p>
                            View all previous interview attempts and feedback.
                        </p>
                    </div>
                </Link>
            </div>
            {stats && <DashboardCharts stats={stats} />}
        </div>
    );
}
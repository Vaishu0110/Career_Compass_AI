import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function JobTracker() {
    const [jobs, setJobs] = useState([]);

    const [formData, setFormData] = useState ({
        company: "",
        position: "",
        location: "",
        jobUrl: "",
        salary: "",
        status: "Wishlist",
        notes: "",
    });

    const total = jobs.length;

    const [loading, setLoading] = useState(false);

    const[search, setSearch] = useState("");

    const [filter, setFilter] = useState("All");

    const [updatingId, setUpdatingId] = useState(null);

    const [editingJob, setEditingJob] = useState(null);

    const wishlist = jobs.filter(job=>job.status ==="Wishlist").length;
    const applied = jobs.filter(job=> job.status === "Applied").length;
    const interview = jobs.filter(job => job.status === "Interview").length;
    const offer = jobs.filter(job => job.status === "Offer").length;
    const rejected = jobs.filter(job => job.status === "Rejected").length;

    const fetchJobs = async () => {
        try {
            const res = await axiosInstance.get("/jobs");
            setJobs(res.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(()=> { fetchJobs();
    }, [] );
    const handleChange = (e) => {
        setFormData ({
            ...formData, [e.target.name]: e.target.value,
        });
    };
    const addJob = async () => {
        if (!formData.company || !formData.position){
            alert("Please fill Company and Position");
            return;
        }
        try {
            setLoading(true);
            await axiosInstance.post("/jobs",formData);
            setFormData({
                company:"",
                position:"",
                location: "",
                jobUrl: "",
                salary: "",
                status:"Wishlist",
                notes:"",
            });
            fetchJobs();
        } catch (error) {
            console.error(error);
            alert ("Failed to add Job");
        } finally {
            setLoading(false);
        }
    };

    const updateJob = async () => {
        try{
            setLoading(true);

            await axiosInstance.put(`/jobs/edit/${editingJob._id}`,
                formData
            );

            setEditingJob(null);

            setFormData({
                company:"",
                position:"",
                location: "",
                jobUrl: "",
                salary: "",
                status:"Wishlist",
                notes:"",
            });

            fetchJobs();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try{
            setUpdatingId(id);

            const job= jobs.find(job => job._id === id);

            if(!job) return;

            await axiosInstance.put(`/jobs/edit/${id}`,{
                company: job.company,
                position: job.position,
                location: job.location || "",
                jobUrl: job.jobUrl || "",
                salary: job.salary || "",
                status,
                notes: job.notes || "",
            });

            await fetchJobs();

        } catch (error) {
            console.error("Failed to update job status:", error);
            alert("Failed to update job status.");
        } finally {
            setUpdatingId(null);
        }
    };

    const deleteJob = async (id) => {

        if (!window.confirm("Delete this job application?")){
            return;
        }

        try{
            await axiosInstance.delete(`/jobs/${id}`);
            fetchJobs();
        } catch (error) {
            console.error(error);
        }
    };

    const statusBadgeColors = {
        Wishlist: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800",
        Applied: "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border-teal-200 dark:border-teal-800",
        Interview: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800",
        Offer: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
        Rejected: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border-red-200 dark:border-red-800",
    };

    const filteredJobs = jobs.filter(job => filter === "All" || job.status === filter).filter(job => job.company.toLowerCase().includes(search.toLowerCase()) || job.position.toLowerCase().includes(search.toLowerCase()));
    
    return (
        <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
            
            {/* HERO HEADER */}
            <div className="text-center max-w-3xl mx-auto">
                <span className="bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Application Lifecycle Manager
                </span>
                <h1 className="text-3xl md:text-5xl font-black mt-2 tracking-tight">
                    Job Application Tracker 💼
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base mt-2">
                    Track your job applications, interview stages, offers, and wishlist opportunities in one place.
                </p>
            </div>
            {/* PIPELINE METRIC CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-purple-50 dark:bg-purple-950/40 p-4 rounded-2xl border border-purple-200 dark:border-purple-800 text-center shadow-sm">
                    <span className="text-xs text-purple-800 dark:text-purple-300 font-extrabold uppercase tracking-wider">Wishlist</span>
                    <p className="text-3xl font-black text-purple-700 dark:text-purple-200 mt-1">{wishlist}</p>
                </div>
                <div className="bg-teal-50 dark:bg-teal-950/40 p-4 rounded-2xl border border-teal-200 dark:border-teal-800 text-center shadow-sm">
                    <span className="text-xs text-teal-800 dark:text-teal-300 font-extrabold uppercase tracking-wider">Applied</span>
                    <p className="text-3xl font-black text-teal-700 dark:text-teal-200 mt-1">{applied}</p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-200 dark:border-amber-800 text-center shadow-sm">
                    <span className="text-xs text-amber-800 dark:text-amber-300 font-extrabold uppercase tracking-wider">Interview</span>
                    <p className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-1">{interview}</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-center shadow-sm">
                    <span className="text-xs text-emerald-800 dark:text-emerald-300 font-extrabold uppercase tracking-wider">Offers</span>
                    <p className="text-3xl font-black text-emerald-700 dark:text-emerald-300 mt-1">{offer}</p>
                </div>
                <div className="bg-red-50 dark:bg-red-950/40 p-4 rounded-2xl border border-red-200 dark:border-red-800 text-center shadow-sm">
                    <span className="text-xs text-red-800 dark:text-red-300 font-extrabold uppercase tracking-wider">Rejected</span>
                    <p className="text-3xl font-black text-red-600 dark:text-red-400 mt-1">{rejected}</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl border border-slate-300 dark:border-slate-700 text-center shadow-sm">
                    <span className="text-xs text-slate-700 dark:text-slate-300 font-extrabold uppercase tracking-wider">Total Jobs</span>
                    <p className="text-3xl font-black text-slate-900 dark:text-slate-100 mt-1">{total}</p>
                </div>
            </div>
            {/* MAIN INPUT & APPLICATIONS GRID */}
            <div className="grid md:grid-cols-12 gap-8">
                
                {/* LEFT: ADD / EDIT JOB FORM */}
                <div className="col-span-1 md:col-span-5 bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl border border-teal-100 dark:border-teal-900 space-y-4">
                    <h2 className="text-xl font-bold text-teal-800 dark:text-teal-200 flex items-center gap-2">
                        <span>{editingJob ? "✏️" : "➕"}</span> {editingJob ? "Edit Job Application" : "Add Job Application"}
                    </h2>
                    <div className="space-y-3">
                        <input
                            type="text"
                            name="company"
                            placeholder="Company Name *"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full border border-teal-200 dark:border-teal-800 dark:bg-slate-900 rounded-2xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
                        />
                        <input
                            type="text"
                            name="position"
                            placeholder="Job Position / Role *"
                            value={formData.position}
                            onChange={handleChange}
                            className="w-full border border-teal-200 dark:border-teal-800 dark:bg-slate-900 rounded-2xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Location (e.g., Remote, San Francisco)"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full border border-teal-200 dark:border-teal-800 dark:bg-slate-900 rounded-2xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <input
                            type="text"
                            name="jobUrl"
                            placeholder="Job Listing URL (http://...)"
                            value={formData.jobUrl}
                            onChange={handleChange}
                            className="w-full border border-teal-200 dark:border-teal-800 dark:bg-slate-900 rounded-2xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <input
                            type="text"
                            name="salary"
                            placeholder="Expected Salary (e.g., $90,000 / year)"
                            value={formData.salary}
                            onChange={handleChange}
                            className="w-full border border-teal-200 dark:border-teal-800 dark:bg-slate-900 rounded-2xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full border border-teal-200 dark:border-teal-800 dark:bg-slate-900 rounded-2xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
                        >
                            <option value="Wishlist">Wishlist</option>
                            <option value="Applied">Applied</option>
                            <option value="Interview">Interview</option>
                            <option value="Offer">Offer</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        <textarea
                            rows="3"
                            name="notes"
                            placeholder="Additional Application Notes / Contact Person..."
                            value={formData.notes}
                            onChange={handleChange}
                            className="w-full border border-teal-200 dark:border-teal-800 dark:bg-slate-900 rounded-2xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <button
                        onClick={editingJob ? updateJob : addJob}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 disabled:opacity-50 text-white font-extrabold py-3.5 rounded-2xl shadow-md transition transform active:scale-95 text-sm"
                    >
                        {loading ? "Saving..." : editingJob ? "Update Job Application" : "Add Job Application 🚀"}
                    </button>
                    {editingJob && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingJob(null);
                                setFormData({
                                    company: "",
                                    position: "",
                                    location: "",
                                    jobUrl: "",
                                    salary: "",
                                    status: "Wishlist",
                                    notes: "",
                                });
                            }}
                            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-2xl text-xs uppercase tracking-wider transition"
                        >
                            Cancel Editing
                        </button>
                    )}
                </div>
                {/* RIGHT: APPLICATIONS LIST WITH FILTER & SEARCH */}
                <div className="col-span-1 md:col-span-7 bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl border border-teal-100 dark:border-teal-900 space-y-6">
                    <h2 className="text-xl font-bold text-teal-800 dark:text-teal-200 flex items-center gap-2">
                        <span>📋</span> Saved Applications ({filteredJobs.length})
                    </h2>
                    {/* SEARCH AND FILTER BAR */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                            type="text"
                            placeholder="Search company or position..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border border-teal-200 dark:border-teal-800 dark:bg-slate-900 rounded-2xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full border border-teal-200 dark:border-teal-800 dark:bg-slate-900 rounded-2xl p-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            <option value="All">All Statuses</option>
                            <option value="Wishlist">Wishlist</option>
                            <option value="Applied">Applied</option>
                            <option value="Interview">Interview</option>
                            <option value="Offer">Offer</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    {/* APPLICATIONS LIST */}
                    {jobs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[300px] text-center p-6 border-2 border-dashed border-teal-100 dark:border-teal-900 rounded-2xl">
                            <p className="text-gray-500 text-sm font-medium">No job applications added yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
                            {filteredJobs.map((job) => (
                                <div
                                    key={job._id}
                                    className="p-5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50/60 dark:bg-slate-900/60 shadow-sm hover:shadow-md transition space-y-3"
                                >
                                    <div className="flex justify-between items-start gap-2">
                                        <div>
                                            <h3 className="text-base font-extrabold text-gray-900 dark:text-gray-100">
                                                {job.position}
                                            </h3>
                                            <p className="text-xs font-bold text-teal-700 dark:text-teal-300 mt-0.5">
                                                🏢 {job.company}
                                            </p>
                                        </div>
                                        <span
                                            className={`text-[11px] font-extrabold px-3 py-1 rounded-full border shadow-sm ${
                                                statusBadgeColors[job.status] || "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {job.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                                        {job.location && <span>📍 {job.location}</span>}
                                        {job.salary && <span className="text-emerald-600 dark:text-emerald-400 font-bold">💰 {job.salary}</span>}
                                        {job.jobUrl && (
                                            <a
                                                href={job.jobUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-teal-600 hover:underline font-bold"
                                            >
                                                🔗 Listing URL
                                            </a>
                                        )}
                                    </div>
                                    {job.notes && (
                                        <p className="text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-gray-100 dark:border-slate-700">
                                            📝 {job.notes}
                                        </p>
                                    )}
                                    {/* 1-CLICK STATUS TRANSITION PILLS */}
                                    <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-gray-200 dark:border-slate-800">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mr-1">
                                            Set Status:
                                        </span>
                                        {["Wishlist", "Applied", "Interview", "Offer", "Rejected"].map((st) => (
                                            <button
                                                key={st}
                                                disabled={updatingId === job._id}
                                                onClick={() => updateStatus(job._id, st)}
                                                className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg transition ${
                                                    job.status === st
                                                        ? "bg-teal-700 text-white shadow-inner"
                                                        : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:bg-teal-50"
                                                }`}
                                            >
                                                {st}
                                            </button>
                                        ))}
                                        <div className="flex items-center gap-1 ml-auto">
                                            <button
                                                onClick={() => {
                                                    setEditingJob(job);
                                                    setFormData({
                                                        company: job.company,
                                                        position: job.position,
                                                        location: job.location || "",
                                                        jobUrl: job.jobUrl || "",
                                                        salary: job.salary || "",
                                                        status: job.status,
                                                        notes: job.notes || "",
                                                    });
                                                }}
                                                className="text-[10px] font-extrabold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 px-2.5 py-1 rounded-lg hover:bg-indigo-100 transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                disabled={updatingId === job._id}
                                                onClick={() => deleteJob(job._id)}
                                                className="text-[10px] font-extrabold bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300 border border-red-200 dark:border-red-800 px-2.5 py-1 rounded-lg hover:bg-red-100 transition"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
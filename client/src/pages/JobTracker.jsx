import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Plus, Pencil, ClipboardList, MapPin, IndianRupeeIcon, Link as LinkIcon, FileText, Trash2, X, Search, Briefcase, BriefcaseBusiness, IndianRupee, } from "lucide-react";

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
        Wishlist: "bg-teal-100 text-teal-800 border-teal-200",
        Applied: "bg-teal-100 text-teal-800 border-teal-200",
        Interview: "bg-teal-100 text-teal-800 border-teal-200",
        Offer: "bg-teal-100 text-teal-800 border-teal-200",
        Rejected: "bg-teal-100 text-teal-800 border-teal-200",
    };

    const filteredJobs = jobs.filter(job => filter === "All" || job.status === filter).filter(job => job.company.toLowerCase().includes(search.toLowerCase()) || job.position.toLowerCase().includes(search.toLowerCase()));
    
    return (
        <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
            
            {/* HERO HEADER */}
            <div className="text-center max-w-3xl mx-auto">
                <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Application Lifecycle Manager
                </span>
                <h1 className="text-3xl md:text-5xl font-black mt-2 tracking-tight">
                    Job Application Tracker
                </h1>
                <p className="text-slate-600 text-sm md:text-base mt-2">
                    Track your job applications, interview stages, offers, and wishlist opportunities in one place.
                </p>
            </div>
            {/* PIPELINE METRIC CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-center shadow-sm">
                    <span className="text-xs text-emerald-800 font-extrabold uppercase tracking-wider">Wishlist</span>
                    <p className="text-3xl font-black text-emerald-700 mt-1">{wishlist}</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-center shadow-sm">
                    <span className="text-xs text-emerald-800 font-extrabold uppercase tracking-wider">Applied</span>
                    <p className="text-3xl font-black text-emerald-700 mt-1">{applied}</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-center shadow-sm">
                    <span className="text-xs text-emerald-800 font-extrabold uppercase tracking-wider">Interview</span>
                    <p className="text-3xl font-black text-emerald-700 mt-1">{interview}</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-center shadow-sm">
                    <span className="text-xs text-emerald-800 font-extrabold uppercase tracking-wider">Offers</span>
                    <p className="text-3xl font-black text-emerald-700 mt-1">{offer}</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-center shadow-sm">
                    <span className="text-xs text-emerald-800 font-extrabold uppercase tracking-wider">Rejected</span>
                    <p className="text-3xl font-black text-emerald-700 mt-1">{rejected}</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-center shadow-sm">
                    <span className="text-xs text-emerald-800 font-extrabold uppercase tracking-wider">Total Jobs</span>
                    <p className="text-3xl font-black text-emerald-700 mt-1">{total}</p>
                </div>
            </div>
            {/* MAIN INPUT & APPLICATIONS GRID */}
            <div className="grid md:grid-cols-12 gap-8">
                
                {/* LEFT: ADD / EDIT JOB FORM */}
                <div className="col-span-1 md:col-span-5 bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-teal-100 space-y-4">
                    <h2 className="text-xl font-bold text-teal-500 flex items-center gap-2">
                        {editingJob ? <Pencil size={20} /> : <Plus size={20} />} {editingJob ? "Edit Job Application" : "Add Job Application"}
                    </h2>
                    <div className="space-y-3">
                        <input
                            type="text"
                            name="company"
                            placeholder="Company Name"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full border border-teal-200 rounded-2xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold [&::placeholder]:opacity-20"
                        />
                        <input
                            type="text"
                            name="position"
                            placeholder="Job Position / Role"
                            value={formData.position}
                            onChange={handleChange}
                            className="w-full border border-teal-200 rounded-2xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold [&::placeholder]:opacity-20"
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Location (e.g., Remote, New Delhi)"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full border border-teal-200 rounded-2xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold [&::placeholder]:opacity-20"
                        />
                        <input
                            type="text"
                            name="jobUrl"
                            placeholder="Job Listing URL"
                            value={formData.jobUrl}
                            onChange={handleChange}
                            className="w-full border border-teal-200 rounded-2xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold [&::placeholder]:opacity-20"
                        />
                        <input
                            type="text"
                            name="salary"
                            placeholder="Expected Salary (e.g., ₹90,000 / year)"
                            value={formData.salary}
                            onChange={handleChange}
                            className="w-full border border-teal-200 rounded-2xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold [&::placeholder]:opacity-20"
                        />
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full border border-teal-200 rounded-2xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
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
                            className="w-full border border-teal-200 rounded-2xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold [&::placeholder]:opacity-20"
                        />
                    </div>
                    <button
                        onClick={editingJob ? updateJob : addJob}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 disabled:opacity-50 text-white font-extrabold py-3.5 rounded-2xl shadow-md transition transform active:scale-95 text-sm"
                    >
                        {loading ? "Saving..." : editingJob ? "Update Job Application" : "Add Job Application"}
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
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-2xl text-xs uppercase tracking-wider transition"
                        >
                            Cancel Editing
                        </button>
                    )}
                </div>
                {/* RIGHT: APPLICATIONS LIST WITH FILTER & SEARCH */}
                <div className="col-span-1 md:col-span-7 bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-teal-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex items-center justify-center">
                            <ClipboardList size={19} className="text-teal-600 dark:text-teal-400" />
                        </div>
                        <h2 className="text-xl font-bold text-teal-500 flex items-center gap-2">
                            Saved Applications
                        </h2>
                        <p className="text-teal-700 mt-1 font-medium">
                            {filteredJobs.length} application
                            {filteredJobs.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                    {/* SEARCH AND FILTER BAR */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        <input
                            type="text"
                            placeholder="Search company or position..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border border-teal-200 rounded-2xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 [&::placeholder]:opacity-20"
                        />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full border border-teal-200 rounded-2xl p-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                        <div className="flex flex-col items-center justify-center h-[300px] text-center p-6 border-2 border-dashed border-teal-100 rounded-2xl">
                            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex items-center justify-center mb-3">
                                <ClipboardList size={22} className="text-teal-600 dark:text-teal-400"/>
                            </div>
                            <p className="text-teal-600 text-sm font-medium">No job applications added yet.</p>
                        </div>
                    ) : filteredJobs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[300px] text-center p-6 border-2 border-dashed border-teal-200 dark:border-teal-900 rounded-2xl">
                            <Search size={24} className="text-teal-600 dark:text-teal-400 mb-3" />
                            <p className="text-teal-700 dark:text-teal-300 text-sm font-semibold">
                                No applications match your search.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
                            {filteredJobs.map((job) => (
                                <div
                                    key={job._id}
                                    className="p-5 rounded-2xl border border-teal-100 bg-teal-200/80 shadow-sm hover:shadow-md transition space-y-3"
                                >
                                    <div className="flex justify-between items-start gap-2">
                                        <div className="min-w-0">
                                            <h3 className="text-base font-extrabold text-slate-900 truncate">
                                                {job.position}
                                            </h3>
                                            <p className="text-sm font-bold text-teal-700 mt-1 flex items-center gap-1.5">
                                                <BriefcaseBusiness size={14} />
                                                {job.company}
                                            </p>
                                        </div>
                                        <span
                                            className={`shrink-0 text-[11px] font-extrabold px-3 py-1 rounded-full border ${
                                                statusBadgeColors[job.status]
                                            }`}
                                        >
                                            {job.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-teal-700">
                                        {job.location && <span className="flex items-center gap-1.5 font-medium"><MapPin size={14} />{job.location}</span>}
                                        {job.salary && <span className="flex items-center gap-1 font-medium"><IndianRupeeIcon size={14} /> {job.salary}</span>}
                                        {job.jobUrl && (
                                            <a
                                                href={job.jobUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 text-teal-600 hover:underline font-bold"
                                            >
                                                <LinkIcon size={14} /> Listing URL
                                            </a>
                                        )}
                                    </div>
                                    {job.notes && (
                                        <div className="flex gap-2 mt-4 p-3 rounded-xl bg-white border border-teal-100">
                                            <FileText size={15} className="shrink-0 mt-0.5 text-teal-600" />
                                            <p className="text-xs text-teal-200 font-medium">
                                                {job.notes}
                                            </p>
                                        </div>
                                    )}
                                    {/* 1-CLICK STATUS TRANSITION PILLS */}
                                    <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-gray-200">
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
                                                className="text-medium font-extrabold bg-teal-50 text-teal-700 border border-teal-200 px-2.5 py-1 rounded-lg hover:bg-teal-100 transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                disabled={updatingId === job._id}
                                                onClick={() => deleteJob(job._id)}
                                                className="text-medium font-extrabold bg-teal-50 text-teal-700 border border-teal-200 px-2.5 py-1 rounded-lg hover:bg-red-200 transition"
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
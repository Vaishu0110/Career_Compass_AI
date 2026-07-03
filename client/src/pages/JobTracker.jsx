import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function JobTracker() {
    const [jobs, setJobs] = useState([]);

    const [formData, setFormData] = useState ({
        company: "",
        position: "",
        status: "Applied",
        notes: "",
    });

    const [loading, setLoading] = useState(false);

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
                status:"Applied",
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

    const updateStatus = async (id, status) => {
        try {
            await axiosInstance.put(`/jobs/${id}`,{status, });
            fetchJobs();
        } catch (error) {
            console.error(error);
        }
    };
    const deleteJob = async (id) => {
        try{
            await axiosInstance.delete(`/jobs/${id}`);
            fetchJobs();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-8">
                Job Tracker
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 mb-8">
                <div className="bg-blue-500 text-white rounded-lg p-5 text-center">
                    <h2 className="text-lg">
                        Applied
                    </h2>
                    <div className="text-4xl font-bold">
                        {applied}
                    </div>
                </div>
                <div className="bg-yellow-500 text-white rounded-lg p-5 text-center">
                    <h2 className="text-lg">
                        Interview
                    </h2>
                    <div className="text-4xl font-bold">
                        {interview}
                    </div>
                </div>
                <div className="bg-green-600 text-white rounded-lg p-5 text-center">
                    <h2 className="text-xl">
                        Offers
                    </h2>
                    <div className="text-4xl font-bold">
                        {offer}
                    </div>
                </div>
                <div className="bg-red-600 text-white rounded-lg p-5 text-center">
                    <h2 className="text-lg">
                        Rejected
                    </h2>
                    <div className="text-4xl font-bold">
                        {rejected}
                    </div>
                </div>
            </div>
            <div  className="grid md:grid-cols-2 gap-8">
                {/*LEFT */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-6">
                        Add Job
                    </h2>
                    <input type="text" name="company" placeholder="Company"
                    value={formData.company} onChange={handleChange} className="w-full border p-3 rounded mb-4"/>
                    <input type="text" name="position" placeholder="Job Position" value={formData.position}
                    onChange={handleChange} className="w-full border p-3 rounded mb-4"/>
                    <select name="status" value={formData.status} onChange={handleChange}
                    className="w-full border p-3 rounded mb-4">
                        <option>Applied</option>
                        <option>Interview</option>
                        <option>Offer</option>
                        <option>Rejected</option>
                    </select>
                    <textarea rows="4" name="notes" placeholder="Notes" value={formData.notes}
                    onChange={handleChange} className="w-full border p-3 rounded mb-4"/>
                    <button onClick={addJob} disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
                        {loading ? "Saving..." : "Add Job" }
                    </button>
                </div>
                {/* RIGHT */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-6">
                        My Applications
                    </h2>
                    {jobs.length === 0 ? (
                        <p className="text-gray-500">
                            No jobs added yet.
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {jobs.map((job)=> (
                                <div key={job._id} className="border rounded-lg p-4 shadow hover:shadow-xl transition duration-300">
                                    <h3 className="text-xl font-bold">
                                        {job.position}
                                    </h3>
                                    <p className="text-gray-600">
                                        {job.company}
                                    </p>
                                    {job.appliedDate && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            Applied on {new Date(job.appliedDate).toLocaleDateString()}
                                        </p>
                                    )}
                                    <div className="mt-3">
                                        <span className={`px-3 py-1 rounded-full text-white
                                        ${job.status==="Applied" && "bg-blue-500"}
                                        ${job.status==="Interview" && "bg-yellow-500"}
                                        ${job.status==="Offer" && "bg-green-600"}
                                        ${job.status==="Rejected" && "bg-red-600"}
                                        `}>
                                            {job.status}
                                        </span>
                                    </div>
                                    {job.notes && ( <p className="mt-2">{job.notes}</p>)}
                                    <div className="flex gap-2 mt-4 flex-wrap">
                                        <button onClick={()=>updateStatus(job._id,"Applied")} className="bg-blue-500 text-white px-3 py-1 rounded">
                                            Applied
                                        </button>
                                        <button onClick={()=> updateStatus(job._id, "Interview")} className="bg-yellow-500 text-white px-3 py-1 rounded">
                                            Interview
                                        </button>
                                        <button onClick={()=> updateStatus(job._id, "Offer")} className="bg-green-600 text-white px-3 py-1 rounded">
                                            Offer
                                        </button>
                                        <button onClick={()=> updateStatus(job._id, "Rejected")} className="bg-red-600 text-white px-3 py-1 rounded">
                                            Rejected
                                        </button>
                                        <button onClick={()=> deleteJob(job._id)} className="bg-gray-800 text-white px-3 py-1 rounded">
                                            🗑 Delete
                                        </button>
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
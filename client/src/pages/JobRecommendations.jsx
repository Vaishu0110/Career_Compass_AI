import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function JobRecommendations(){
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        fetchRecommendations();
    }, []);

    const fetchRecommendations = async () => {
        try{
            const res = await axiosInstance.get("/job-recommendations");
            setJobs(res.data.jobs || []);
        } catch (error) {
            console.error(error);
            alert("Failed to load recommendations.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-8 text-center">
                Loading recommendations...
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">
                AI Job Recommendations
            </h1>

            {jobs.length === 0 ? (
                <p>No recommendations available yet.</p>
            ):(
                <div className="grid md:grid-cols-2 gap-6">
                    {jobs.map((job, index)=>(
                        <div key={index} className="bg-white rounded-xl shadow p-6" >
                            <h2 className="text-2xl font-bold">
                                {job.title}
                            </h2>

                            <p className="text-gray-600">
                                {job.company}
                            </p>

                            <p className="mt-2">
                                {job.location}
                            </p>

                            <p className="mt-2 font-bold text-green-600">
                                Match: {job.matchScore}%
                            </p>

                            <h3 className="mt-4 font-semibold">
                                Skills Matched
                            </h3>

                            <ul className="list-disc ml-5">
                                {job.skillsMatched?.map((skill) => (
                                    <li key={skill}>{skill}</li>
                                ))}
                            </ul>

                            <h3 className="mt-4 font-semibold">
                                Missing Skills
                            </h3>

                            <ul className="list-disc ml-5">
                                {job.missingSkills?.map((skill)=>(
                                    <li key={skill}>{skill}</li>
                                ))}
                            </ul>

                            <p className="mt-4 text-sm">
                                {job.reason}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
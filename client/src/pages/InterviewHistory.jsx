import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function InterviewHistory() {
    const [history, setHistory ] = useState([]);
    const [selectedInterview, setSelectedInterview] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect (()=> {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try{
            const res = await axiosInstance.get("/interview-history");
            setHistory(res.data);
        } catch (error) {
            console.error(error) 
        } finally {
            setLoading(false);
        }
    };

    if(loading) {
        return (
            <div className="text-center p-10">
                Loading Interview History
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-8">

            <h1 className="text-4xl font-bold mb-8">
                Interview History
            </h1>

            {history.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-8 text-center">
                    No interview attempts yet.
                </div>
            ) : (
                <div className="space-y-5">
                    
                    {history.map((item) => (

                        <div key={item._id} className="bg-white rounded-xl shadow p-6 flex justify-between items-center">

                            <div>

                                <h2 className="text-2xl font-bold">
                                    {item.role}
                                </h2>

                                <p className="text-gray-600">
                                    Difficulty : {item.difficulty}
                                </p>

                                <p className="text-gray-500">
                                    {new Date(item.createdAt).toLocaleString()}
                                </p>

                            </div>

                            <div className="text-right">

                                <div className="text-4xl font-bold text-green-600">
                                    {item.overallScore}/100    
                                </div>

                                <button onClick={() => setSelectedInterview(item)} className="mt-3 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
                                    View Feedback
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

            {selectedInterview && (

                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

                    <div className="bg-white rounded-xl w-full max-w-3xl p-8 max-h-[90vh] overflow-y-auto">

                        <h2 className="text-3xl font-bold mb-6">
                            Interview Feedback
                        </h2>

                        <div className="mb-6">

                            <h3 className="text-xl font-semibold">
                                Role
                            </h3>

                            <p>
                                {selectedInterview.role}
                            </p>

                        </div>

                        <div className="mb-6">

                            <h3 className="text-xl font-semibold">
                                Overall Score
                            </h3>

                            <p className="text-5xl text-green-600 font-bold">
                                {selectedInterview.overallScore}/100
                            </p>

                        </div>

                        <div>    
                            <h3 className="font-bold text-lg">
                                Strengths
                            </h3>

                            <ul className="list-disc ml-6 mt-2">
                                {selectedInterview.strengths?.map((item, index) => (
                                    <li key={index}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-6">

                            <h3 className="font-bold text-lg">
                                Suggestions
                            </h3>

                            <ul className="list-disc ml-6 mt-2">

                                {selectedInterview.suggestions?.map((item, index) => (
                                    <li key={index}>
                                        {items}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button onClick = {() => setSelectedInterview(null)}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
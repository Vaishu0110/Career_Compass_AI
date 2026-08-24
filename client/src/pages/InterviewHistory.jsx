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
            const res = await axiosInstance.get("/interview/history");

            console.log("Interview history:", res.data);

            if(res.data.success){
                setHistory(res.data.interviews || []);
            }
        } catch (error) {
            console.error("Failed to fetch interview history:", error.response?.data || error) 
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

                        <h2 className="text-3xl font-bold">
                            Interview Report
                        </h2>

                        <p className="text-gray-600 mb-6">
                            {selectedInterview.role} • {selectedInterview.difficulty}
                        </p>

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

                            <h3 className="font-bold text-lg text-red-600">
                                Weaknesses
                            </h3>

                            <ul className="list-disc ml-6 mt-2">
                                {selectedInterview.weaknesses?.map((item, index) => (
                                    <li key={index}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-6">

                            <h3 className="font-bold text-lg text-blue-700">
                                Suggestions
                            </h3>

                            <ul className="list-disc ml-6 mt-2">

                                {selectedInterview.suggestions?.map((item, index) => (
                                    <li key={index}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="border-t pt-6">

                            <h3 className="text-2xl font-bold mb-5">
                                Question-by-Question Evaluation
                            </h3>

                            {selectedInterview.questions?.length > 0 ? (
                                <div className="space-y-6">
                                    {selectedInterview.questions.map((question, index) => (
                                        <div key={index} className="border rounded-xl p-5">
                                            <div className="flex justify-between items-start gap-4">
                                                
                                                <h4 className="font-bold text-lg">
                                                    Question {index+1}
                                                </h4>

                                                <span className={`font-bold px-3 py-1 rounded ${
                                                    question.score >=70 ? "bg-green-100 text-green-700" 
                                                    : question.score >=40
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}>
                                                    {question.score}/100
                                                </span>
                                            </div>

                                            

                                            <p className="mt-3 font-semibold">
                                                {question.question}
                                            </p>

                                            <div className="mt-4">

                                                <p className="font-semibold text-gray-700">
                                                    Your Answer
                                                </p>

                                                <div className="bg-gray-50 border rounded-lg p-4 mt-2">

                                                    {question.answer ? (
                                                        <p className="whitespace-pre-wrap">
                                                            {question.answer}
                                                        </p>
                                                    ) : (
                                                        <p className="text-gray-500 italic">
                                                            No answer provided.
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-4">

                                                <p className="font-semibold text-blue-700">
                                                    AI Feedback
                                                </p>

                                                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-2">

                                                    <p>
                                                        {question.feedback || "No feedback available."}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ):(
                                <div className="bg-gray-50 rounded-lg p-5 text-gray-500">
                                    Question-level evaluation is not available for this interview.
                                </div>
                            )} 
                        </div>

                        <div className="flex justify-end mt-8">
                            <button onClick = {() => setSelectedInterview(null)}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
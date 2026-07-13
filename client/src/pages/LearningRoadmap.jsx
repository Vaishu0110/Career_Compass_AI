import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function LearningRoadmap(){
    const[targetRole, setTargetRole]= useState("");
    const[roadmap, setRoadmap]= useState(null);
    const[loading ,setLoading]= useState(false);

    const generateRoadmap = async ()=> {
        if(!targetRole.trim()) {
            alert("Please enter a target role");
            return;
        }
        try{
            setLoading(true);
            const res = await axiosInstance.post("/roadmap/generate",
            {
                targetRole,
            }
        );
        setRoadmap(res.data.result);
        } catch (error) {
            console.error(error);
            alert("Failed to generate roadmap");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div  className="max-w-6xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-8">
                Learning Roadmap Generator
            </h1>
            <div className="grid md:grid-cols-2 gap-8">
                {/*INPUT SECTION*/}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">
                    Career Goal
                </h2>
                <input type="text" placeholder="Example: MERN Stack Developer" value={targetRole}
                onChange={(e)=> setTargetRole(e.target.value)} className="w-full border p-3 rounded"/>
                <button onClick={generateRoadmap} disabled={loading} className="w-full mt-4 bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
                    {loading? "Generating..." : "Generate Roadmap"}
                </button>
            </div>
           {/* RESULT SECTION*/}
           <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">
                    Learning Plan
                </h2>
                {!roadmap?(<p className="text-gray-500">
                    Your Roadmap will appear here.
                </p>
                ):(
                    <div className="space-y-6">
                        {roadmap.months?.map((month,index)=>(
                            <div key={index} className="border rounded p-4">
                                <h3 className="text-xl font-bold mb-3">
                                    {month.month}
                                </h3>
                                <ul className="list-disc pl-5">
                                    {month.topics?.map((topic, i)=>(<li key={i}>{topic}</li>))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )
                }
            </div> 
            </div>
        </div>
    );
}
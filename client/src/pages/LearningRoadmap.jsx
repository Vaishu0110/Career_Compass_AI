import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export default function LearningRoadmap(){
    const[targetRole, setTargetRole]= useState("");
    const[roadmap, setRoadmap]= useState(null);
    const[loading ,setLoading]= useState(false);

    useEffect(() => {
        fetchRoadmap();
    }, []);

    const fetchRoadmap = async () => {
        try{
            const res = await axiosInstance.get("/learning-roadmap");

            if(res.data) {
                setRoadmap(res.data);
            }
        } catch (error)
        {
            console.error(error);
        }
    };

    const generateRoadmap = async ()=> {
        if(!targetRole.trim()) {
            alert("Please enter a target role");
            return;
        }
        try{
            setLoading(true);
            const ai = await axiosInstance.post("/learning-roadmap/generate",{ targetRole,});

            const generatedRoadmap = ai.data.result.roadmap;

            const saved = await axiosInstance.post("/learning-roadmap/save", { targetRole,
                roadmap: generatedRoadmap,
            });

        setRoadmap(res.data.result);
        } catch (error) {
            console.error(error);
            alert("Failed to generate roadmap");
        } finally {
            setLoading(false);
        }
    };

    const toggleStep = async (index) => {

        const updatedRoadmap = {
            ...roadmap,

            roadmap:roadmap.roadmap.map((step, i) => 
            i=== index ? {...step, completed: !step.completed} : step ),
        };
        
        const completed = updatedRoadmap.roadmap.filter(
            step => step.completed
        ).length;

        updatedRoadmap.progress = Math.round((completed / updatedRoadmap.roadmap.length) * 100);

        setRoadmap(updatedRoadmap);

        try{
            await axiosInstance.put(`/learning-roadmap/${roadmap._id}`,{
                roadmap: updatedRoadmap.roadmap,  
            });
        } catch (error) {
            console.error(error);
        }
    }
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
                    <>
                        <div className="mb-6">
                            <div className="flex justify-between">

                                <h3 className="font-bold">
                                    Progress
                                </h3>

                                <span className="font-bold text-green-600">
                                    {roadmap.progress}%
                                </span>

                            </div>

                            <div className="w-full h-3 bg-gray-200 rounded mt-2">

                                <div className="bg-green-600 h-3 rounded-full"
                                style={{ 
                                    width: `${roadmap.progress}%`
                                }} />
                            </div>
                        </div>
                        <div className="space-y-6">
                            {roadmap.months?.map((step, index)=>(
                                <div key={index} className="border rounded p-4">
                                    <div className="flex items-center gap-3">
                                        <input type="checkbox" checked={step.completed} onChange={() => toggleStep(index)} className="w-5 h-5 cursor-pointer" />

                                        <h3 className="text-lg font-semibold">
                                            {step.title}
                                        </h3>                              
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )
                }
            </div> 
            </div>
        </div>
    );
}
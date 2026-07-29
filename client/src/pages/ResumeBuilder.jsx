import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import ModernTemplate from "../components/ResumeGenerator/ResumeTemplates/ModernTemplate";
import StudentTemplate from "../components/ResumeGenerator/ResumeTemplates/StudentTemplate";
import DeveloperTemplate from "../components/ResumeGenerator/ResumeTemplates/DeveloperTemplate";
import CorporateTemplate from "../components/ResumeGenerator/ResumeTemplates/CorporateTemplate";
import ExecutiveTemplate from "../components/ResumeGenerator/ResumeTemplates/ExecutiveTemplate";
import ProfessionalTemplate from "../component/ResumeGenerator/ResumeTemplate/ProfessionalTemplate";

export default function ResumeBuilder() { 

    const [resume, setResume] = useState({
        fullName: "",
        email: "",
        phone: "",
        targetRole: "",

        summary: "",

        education: "",

        experience: "",

        skills: "",

        projects: "",
    });

    const [template, setTemplate] = useState("modern");

    const handleChange = (e) => {

        setResume({
            ...resume,
            [e.target.name]: e.target.value,
        });
    };

    const saveResume = async () => {
        try {
            await axiosInstance.post("/generated-resume/save",{

                fullName: resume.fullName,

                targetRole: resume.targetRole,

                template,

                resume,

            });

            alert("Resume Saved");
            
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="grid grid-cols-2 gap-8 p-8">

            <div className="space-y-4">


                <div className="flex gap-3 mb-5">

                    <button onClick={() => setTemplate("modern")} className="bg-blue-600 text-white px-4 py-2 rounded">
                        Modern
                    </button>

                    <button onClick={() => setTemplate("professional")} className="bg-gray-700 text-white px-4 py-2 rounded">
                        Professional
                    </button>

                    <button onClick={() => setTemplate("student")} className="bg-green-600 text-white px-4 py-2 rounded">
                        Student
                    </button>

                    <button onClick={() => setTemplate("developer")} className="bg-purple-600 text-white px-4 py-2 rounded">
                        Developer
                    </button>

                    <button onClick={() => setTemplate("corporate")} className="bg-orange-600 text-white px-4 py-2 rounded">
                        Corporate
                    </button>

                    <button onClick={() => setTemplate("executive")} className="bg-pink-600 text-white px-4 py-2 rounded">
                        Executive
                    </button>

                </div>

                <h1 className="text-3xl font-bold">
                    Resume Builder
                </h1>

                <input name="fullName" placeholder="Full Name" value={resume.fullName} 
                onChange={handleChange} className="w-full border p-3 rounded" />

                <input name="email" placeholder="Email" value={resume.email} 
                onChange={handleChange} className="w-full border p-3 rounded" />

                <input name="phone" placeholder="Phone" value={resume.phone}
                onChange={handleChange} className="w-full border p-3 rounded" />

                <input name="targetRole" placeholder="Target Role" value={resume.targetRole}
                onChange={handleChange} className="w-full border p-3 rounded" />

                <textarea rows={4} name="summary" placeholder="Professional Summary" 
                value={resume.summary} onChange={handleChange} className='w-full border p-3 rounded' />

                <textarea rows={4} name="education" placeholder="Education" value={resume.education} 
                onChange={handleChange} className="w-full border p-3 rounded" />

                <textarea rows={4} name="experience" placeholder="Experience" value={resume.experience} 
                onChange={handleChange} className="w-full border p-3 rounded" />

                <textarea rows={4} name="skills" placeholder="Skills" value={resume.skills}
                onChange={handleChange} className="w-full border p-3 rounded" />

                <textarea rows={4} name="projects" placeholder="Projects" value={resume.projects}
                onChange={handleChange} className="w-full border p-3 rounded" />

                <button onClick={saveResume} className="bg-blue-600 text-white px-6 py-3 rounded" >
                    Save Resume
                </button>

            </div>

            <div>

                {template === "modern" && (
                    <ModernTemplate resume={resume} />
                )}

                {template === "student" && (
                    <StudentTemplate resume={resume} />
                )}

                {template === "developer" && (
                    <DeveloperTemplate resume={resume} />
                )}

                {template === "corporate" && (
                    <CorporateTemplate resume={resume} />
                )}

                {template === "executive" && (
                    <ExecutiveTemplate resume={resume} />
                )}
                
            </div>

        </div>

    );
}
import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import ModernTemplate from "../components/ResumeGenerator/ResumeTemplates/ModernTemplate";
import StudentTemplate from "../components/ResumeGenerator/ResumeTemplates/StudentTemplate";
import DeveloperTemplate from "../components/ResumeGenerator/ResumeTemplates/DeveloperTemplate";
import CorporateTemplate from "../components/ResumeGenerator/ResumeTemplates/CorporateTemplate";
import ExecutiveTemplate from "../components/ResumeGenerator/ResumeTemplates/ExecutiveTemplate";
import ProfessionalTemplate from "../components/ResumeGenerator/ResumeTemplates/ProfessionalTemplate";
import TemplateCard from "../components/ResumeGenerator/TemplateCard";
import modernImg from "../assets/templates/modern.png";
import studentImg from "../assets/templates/student.png";
import developerImg from "../assets/templates/developer.png";
import executiveImg from "../assets/templates/executive.png";
import professionalImg from "../assets/templates/professional.png";
import corporateImg from "../assets/templates/corporate.png";

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


                <div className="grid grid-cols-3 gap-4 mb-8">

                    <TemplateCard title="Modern" image={modernImg} 
                    selected={template === "modern" } onClick={() => setTemplate("modern")} />

                    <TemplateCard title="Professional" image={professionalImg} 
                    selected={template === "professional" } onClick={() => setTemplate("professional")} />

                    <TemplateCard title="Student" image={studentImg} 
                    selected={template === "student" } onClick={() => setTemplate("student")}/>

                    <TemplateCard title="Developer" image={developerImg}
                    selected={template === "developer"} onClick={() => setTemplate("developer")} />

                    <TemplateCard title="Corporate" image={corporateImg}
                    selected={template === "corporate"} onClick={() => setTemplate("corporate")} />

                    <TemplateCard title="Executive" image={executiveImg}
                    selected={template === "executive"} onClick={() => setTemplate("executive")} />

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

            <div className="flex justify-center bg-gray-200 p-8 rounded-xl overflow-auto">

                <div className="bg-white shadow-2xl" style={{
                    width: "794px",
                    minHeight: "1123px",
                    padding: "40px",
                }} >

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

                    {template === "professional" && (
                        <ProfessionalTemplate resume={resume} />
                    )}
                    
                </div>
                
            </div>

        </div>

    );
}
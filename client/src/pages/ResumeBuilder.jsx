import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
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

import html2pdf from "html2pdf.js"; 

export default function ResumeBuilder() { 

    const { id } = useParams();

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

        linkedin: "",
        github: "",
        portfolio: "",

        achievements: [],
    });

    const [template, setTemplate] = useState("modern");

    const [generatingAI, setGeneratingAI] = useState(false);

    const [zoom ,setZoom] = useState(0.8);

    const resumePreviewRef = useRef(null);

    const handleChange = (e) => {

        setResume({
            ...resume,
            [e.target.name]: e.target.value,
        });
    };

    const generateWithAI = async () => {
        if(!resume.fullName.trim()) {
            alert("Please enter your full name.");
            return;
        }

        if(!resume.targetRole.trim()) {
            alert("Please enter your target role.");
            return;
        }

        if (!resume.skills.trim()) {
            alert("Please enter your skills.");
            return;
        }

        if (!resume.projects.trim()) {
            alert ("Please enter at least one project.");
            return;
        }

        try {
            setGeneratingAI(true);

            const res = await axiosInstance.post("/resume-generator/generate",
                {
                    ...resume,
                    template,
                }
            );

            if(!res.data.success) {
                throw new Error(
                    res.data.message || "AI resume generation failed."
                );
            }

            const aiResume = res.data.resume;

            setResume((prev) => ({
                ...prev,
                summary: aiResume.summary || prev.summary,

                skills: Array.isArray(aiResume.skills) ? aiResume.skills.join(", ") : aiResume.skills || prev.skills,

                projects: Array.isArray(aiResume.projects) ? aiResume.projects.map((project) => {
                    if (typeof project === "string") {
                        return project;
                    }

                    return `${project.title || ""}\n${project.description || ""}`;
                }).join("\n\n") : aiResume.projects || prev.projects,

                experience: Array.isArray(aiResume.experience) ? aiResume.experience.map((experience) => {
                    if (typeof experience === "string") {
                        return experience;
                    }

                    return `${experience.role || ""} ${experience.company ? `- ${experience.company}` : ""}\n${experience.description || ""}`;
                }).join("\n\n") : aiResume.experience || prev.experience,

                achievements: Array.isArray(aiResume.achievements) ? aiResume.achievements : prev.achievements,

                linkedin: aiResume.linkedin || prev.linkedin,
                github: aiResume.github || prev.github,
                portfolio: aiResume.portfolio || prev.portfolio,

            }));

            alert("AI has improved your resume successfully!");

        } catch (error) {
            console.error("AI Resume Generation Error:", error.response?.data || error);

            alert(error.response?.data?.message || "Failed to generated resume with AI.");

        } finally {
            setGeneratingAI(false);
        }

    }

    useEffect(() => {
        if(!id) return;

        const loadResume = async () => {
            try {
                const res = await axiosInstance.get(`/generated-resume/${id}`);

                setResume(res.data.resume);
                setTemplate(res.data.template || "modern");

            } catch (error) {
                console.error(error);
                alert("Failed to load resume");
            }
        };

        loadResume();
    },[id]);

    const saveResume = async () => {
        try {
            if (id) {
                await axiosInstance.put(`/generated-resume/${id}`,{
                    fullName: resume.fullName,
                    targetRole: resume.targetRole,
                    template,
                    resume,
                });

                alert("Resume Updated");
            } else {
                await axiosInstance.post("/generated-resume/save",{
                    fullName: resume.fullName,
                    targetRole: resume.targetRole,
                    template,
                    resume,
                });

                alert("Resume Saved");
            }

        } catch (error) {
            console.error(error);
            alert("Failed to save resume");
        }
    };

    const downloadPDF = () => {
        const element = resumePreviewRef.current;

        if(!element) {
            alert("Resume preview not found");
            return;
        }

        const options ={
            margin: 0,
            filename: `${resume.fullName || "MY"}-Resume.pdf`,

            image: {
                type: "jpeg",
                quality: 0.98,
            },

            html2canvas: {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
            },

            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait",
            },
        };

        html2pdf().set(options).from(element).save();
    };

    const renderTemplate = () => {
        switch (template) {
            case "modern":
                return <ModernTemplate resume={resume} />

            case "student":
                return <StudentTemplate resume={resume} />

            case "developer":
                return <DeveloperTemplate resume={resume} />

            case "corporate":
                return <CorporateTemplate resume={resume} />

            case "executive":
                return <ExecutiveTemplate resume={resume} />

            case "professional":
                return <ProfessionalTemplate resume={resume} />
            
            default:
                return <ModernTemplate resume={resume} />

        }
    }

    return (
        <div className="min-h-screen bg-slate-100">

            <div className="bg-white border-b px-6 py-5">

                <div className="max-w-7xl mx-auto">

                    <h1 className="text-3xl font-bold text-gray-900">
                        Resume Builder
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Create a professional resume and preview it live.
                    </p>

                </div>

            </div>

            <div className="max-w-7xl mx-auto p-6">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    <div className="bg-white rounded-2xl shadow-sm border p-6">
                        {/* TEMPLATE SECTION */}
                        <div>
                            
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Choose a Template
                            </h2>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                                <TemplateCard
                                title="Modern"
                                image={modernImg}
                                selected={(template === "modern")}
                                onClick={() => setTemplate("modern")}
                                />

                                <TemplateCard
                                title="Professional"
                                image={professionalImg}
                                selected={template === "professional"}
                                onClick={() => setTemplate("professional")}
                                />

                                <TemplateCard
                                title="Student"
                                image={studentImg}
                                selected={template === "student"}
                                onClick={() => setTemplate("student")}
                                />

                                <TemplateCard
                                title="Developer"
                                image={developerImg}
                                selected={template === "developer"}
                                onClick={() => setTemplate("developer")}
                                />

                                <TemplateCard
                                title="Corporate"
                                image={corporateImg}
                                selected={template === "corporate"}
                                onClick={() => setTemplate("corporate")}
                                />


                                <TemplateCard
                                title="Executive"
                                image={executiveImg}
                                selected={template === "executive"}
                                onClick={() => setTemplate("executive")}
                                />
                        
                            </div>

                        </div>

                        <div className="mt-8">

                            <h2 className="text-xl font-bold text-gray-900">
                                Personal & Professional Information
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Fill in your information below.
                            </p>

                        </div>

                        <div className="space-y-4 mt-6">

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Full Name
                                </label>

                                <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={resume.fullName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                />

                            </div>

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Email
                                </label>

                                <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={resume.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Phone
                                </label>

                                <input 
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                value={resume.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Target Role
                                </label>

                                <input
                                type="text"
                                name="targetRole"
                                placeholder="Target Role"
                                value={resume.targetRole}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Professional Summary
                            </label>

                            <textarea
                            name="summary"
                            rows={5}
                            placeholder="Write a short professional summary"
                            value={resume.summary}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Education
                            </label>

                            <textarea
                            name="education"
                            rows={5}
                            placeholder="Education"
                            value={resume.education}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Experience
                            </label>

                            <textarea
                            name="experience"
                            rows={5}
                            placeholder="Experience"
                            value={resume.experience}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Skills
                            </label>

                            <textarea
                            name="skills"
                            rows={5}
                            placeholder="Skills"
                            value={resume.skills}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Project
                            </label>

                            <textarea
                            name="projects"
                            rows={5}
                            placeholder="Projects"
                            value={resume.projects}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                LinkedIn
                            </label>

                            <input type="text" name="linkedin" placeholder="https://linkedin.com/in/your-profile"
                            value={resume.linkedin} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

                        </div>

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                GitHub
                            </label>

                            <input type="text" name="github" placeholder="https://github.com/username"
                            value={resume.github} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

                        </div>

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Portfolio
                            </label>

                            <input type="text" name="portfolio" placeholder="https://yourportfolio.com"
                            value={resume.portfolio} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

                        </div>

                    </div>

                    <div className="flex flex-col gap-3 mt-8">

                        <button onClick={generateWithAI} disabled={generatingAI} className={`w-full text-white py-3 rounded-lg font-semibold transition ${generatingAI ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`} >
                            {generatingAI ? "AI is Improving Your Resume..." : "Generate / Improve with AI"}
                        </button>
                        <div className="flex gap-4">

                            <button onClick={saveResume}
                            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                                {id ? "Update Resume" : "Save Resume"}
                            </button>

                            <button onClick={downloadPDF} className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                                Download PDF
                            </button>

                        </div>

                    </div>

                </div>

                <div className="lg:sticky lg:top-6 h-fit">

                    <div className="bg-white rounded-2xl shadow-sm border p-4">

                        <div className="flex items-center justify-between mb-4">

                            <div>

                                <h2 className="text-xl font-bold text-gray-900">
                                    Live Preview
                                </h2>

                                <p className="text-sm text-gray-500">
                                    {template} template
                                </p>

                            </div>

                            <div className="flex items-center gap-2">

                                <button onClick={() => setZoom(Math.max(0.5,Number((zoom - 0.1).toFixed(1))))} className="w-9 h-9 rounded-full bg-gray-700 text-white hover:bg-gray-800">
                                    -
                                </button>

                                <button onClick={() => setZoom(1)} className="px-4 h-9 rounded-full bg-blue-600 text-white hover:bg-blue-700 text-sm">
                                    {Math.round(zoom*100)}%
                                </button>

                                <button onClick={() => setZoom(Math.min(1.5,Number((zoom + 0.1).toFixed(1))))} className="w-9 h-9 rounded-full bg-gray-700 text-white hover:bg-gray-800">
                                    +
                                </button>

                            </div>

                        </div>

                        <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl p-6 overflow-auto"
                        style={{
                            minWidth: "794px",
                            minHeight: "1123px",
                        }}
                        >

                            <div ref={resumePreviewRef} id="resume-preview" className="bg-white shadow-2xl border rounded-md"
                            style={{
                                width: "794px",
                                minHeight: "1123px",
                                padding: "24px",
                                transform: `scale(${zoom})`,
                                transformOrigin: "top center",
                            }}>
                                {renderTemplate()}
                            </div>
                            
                        </div>

                    </div>

                    <div className="text-center mt-4">

                        <p className="text-blue-600 font-semibold">

                            Selected Template:

                            <span className="capitalize ml-2">
                                {template}

                            </span>

                        </p>

                    </div>                

                </div>
        
            </div>
            
        </div>
        <style>
            {`
                @media print {

                    body * {
                        visibility: hidden;
                    }

                    #resume-preview,
                    #resume-preview * {
                        visibility: visible;
                    }

                    #resume-preview {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 210mm !important;
                        min-height: 297mm !important;
                        transform: none !important;
                        box-shadow: none !important;
                        padding: 20mm !important;
                    }

                    @page {
                        size: A4;
                        margin: 0;
                    }
                    
                }
            `}
        </style>
    </div>
    );
}
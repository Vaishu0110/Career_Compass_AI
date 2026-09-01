import { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import axiosInstance from "../../api/axiosInstance";
import html2canvas from "html2canvas";
import { useLocation} from "react-router-dom";

export default function ResumeGenerator() {
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    education: "",
    skills: "",
    projects: "",
    experience: "",
    targetRole: "",
    template: "Developer",
  });

  const [generatedResume, setGeneratedResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);

  const [savedResumeId, setSavedResumeId] = useState(null);
  const resumeRef = useRef(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const formatResumeField = (value) => {
    if (Array.isArray(value)) {
      return value.map((item) =>
          typeof item === "string" ? item : item.title || item.description || JSON.stringify(item)).join("\n\n");
      }
      return value || "";
    };

  useEffect(() => {
    if(!location.state?.resume) return;

    const saved = location.state.resume;

    const savedResume = saved.resume || {};

    setSavedResumeId(saved._id);
    
    setFormData({
      fullName: saved.fullName || savedResume.fullName || "",
      email: savedResume.email || "",
      phone: savedResume.phone || "",
      linkedin: savedResume.linkedin || "",
      github: savedResume.github || "",
      portfolio: savedResume.portfolio || "",
      education: savedResume.education || "",
      skills: formatResumeField(savedResume.skills),
      projects: formatResumeField(savedResume.projects),
      experience: formatResumeField(savedResume.experience),
      targetRole: saved.targetRole || savedResume.targetRole || "",
      template: saved.template || "Developer",

    });

    setGeneratedResume({...saved.resume, fullName: savedResume.fullName || saved.fullName || "", targetRole: savedResume.targetRole || saved.targetRole || "", email: savedResume.email || "", phone: savedResume.phone || "", education: savedResume.education || "",});}, [location.state?.resume]);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if(!formData.fullName.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if(!formData.targetRole.trim()) {
      alert("Please enter your target role.");
      return;
    }

    if(!formData.skills.trim()) {
      alert("Please enter your skills.");
      return;
    }

    if(!formData.projects.trim()) {
      alert("Please enter your projects.");
      return;
    }

    try {
      setLoading(true);

      const res = await axiosInstance.post(
        "/resume-generator/generate",
        formData
      );

      const aiResume = {
        ...res.data.resume,

        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        linkedin: res.data.resume.linkedin || formData.linkedin,
        github: res.data.resume.github || formData.github,
        portfolio: res.data.resume.portfolio || formData.portfolio,
        education: formData.education,
        targetRole: formData.targetRole,
      };

      setGeneratedResume(aiResume);
      setSavedResumeId(null);

    } catch (error) {
      console.error(error);
      alert("Failed to generate Resume");
    } finally {
      setLoading(false);
    }
  };

  const saveResume = async () => {
    if(!generatedResume) {
      alert("Generate a resume first.");
      return;
    }

    try {
      setLoading(true);

      const resumeToSave = {
        ...generatedResume,
        fullName: generatedResume.fullName || formData.fullName,
        targetRole: generatedResume.targetRole || formData.targetRole,
        email: generatedResume.email || formData.email,
        phone: generatedResume.phone || formData.phone,
        education: generatedResume.education || formData.education,
        linkedin: generatedResume.linkedin || formData.linkedin,
        github: generatedResume.github || formData.github,
        portfolio: generatedResume.portfolio || formData.portfolio,
      };

      if (savedResumeId) {
        const res = await axiosInstance.put(`/generated-resume/${savedResumeId}`,{
          fullName: resumeToSave.fullName,
          targetRole: resumeToSave.targetRole,
          template: formData.template,
          resume: resumeToSave,
        });

        setGeneratedResume(res.data.resume.resume);
        alert("Resume updated successfully.");
        return;
      }

      const res = await axiosInstance.post("/generated-resume/save",{
        fullName: resumeToSave.fullName,
        targetRole: resumeToSave.targetRole,
        template: formData.template,
        resume: resumeToSave,
      });
      setSavedResumeId(res.data.resume._id);
      setGeneratedResume(res.data.resume.resume);
      alert("Resume saved successfully.");
    } catch (error) {
      console.error("Save resume error:", error);
      alert(error.response?.data?.message || "Failed to save resume.");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    const resume = resumeRef.current || document.getElementById("resume-preview");
    if (!resume) {
      alert("Resume preview element not found.");
      return;
    }

    try {
      setLoading(true);

      const canvas = await html2canvas(resume, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        onclone: (clonedDoc) => {
          // 1. Sanitize oklch from all inline style blocks
          const styleTags = clonedDoc.querySelectorAll("style");
          styleTags.forEach((style) => {
            if (style.innerHTML && style.innerHTML.includes("oklch")) {
              style.innerHTML = style.innerHTML.replace(/oklch\([^)]+\)/g, "#0f172a");
            }
          });

          // 2. Force bright white text on dark headers and all their children
          const darkHeaders = clonedDoc.querySelectorAll(
            "#resume-preview .bg-slate-900, #resume-preview .bg-gray-900, #resume-preview .bg-emerald-700, #resume-preview .bg-emerald-600, #resume-preview .bg-green-600, #resume-preview .bg-blue-800, #resume-preview .bg-blue-700"
          );
          darkHeaders.forEach((header) => {
            header.style.color = "#ffffff";
            const children = header.querySelectorAll("*");
            children.forEach((child) => {
              child.style.color = "#ffffff";
            });
          });

          // 3. Ensure white paper text is dark slate
          const paperSections = clonedDoc.querySelectorAll("#resume-preview section, #resume-preview p, #resume-preview textarea, #resume-preview h2");
          paperSections.forEach((sec) => {
            if (sec.tagName === "TEXTAREA") {
              sec.style.backgroundColor = "#f8fafc";
              sec.style.color = "#0f172a";
              sec.style.borderColor = "#cbd5e1";
            }
          });
        },
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      const fileName = formData.fullName?.trim() ? `${formData.fullName.trim()}_Resume.pdf` : "Resume.pdf";
      pdf.save(fileName);
    } catch (error) {
      console.error("PDF download error:", error);
      alert("Failed to download PDF: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
        <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
            
            {/* HERO HEADER */}
            <div className="text-center max-w-3xl mx-auto">
                <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    ATS Resume Builder & Editor
                </span>
                <h1 className="text-3xl md:text-5xl font-black mt-2 tracking-tight">
                    AI Resume Generator
                </h1>
                <p className="text-teal-600 text-sm md:text-base mt-2">
                    Enter your details below to generate an ATS-optimized, high-impact resume in your choice of 6 executive templates.
                </p>
            </div>
            {/* MAIN 2-COLUMN LAYOUT: FORM & LIVE PREVIEW */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
                
                {/* LEFT: FORM INPUT CARD */}
                <ResumeForm
                    formData={formData}
                    handleChange={handleChange}
                    handleGenerate={handleGenerate}
                    loading={loading}
                    setPhoto={setPhoto}
                />
                {/* RIGHT: LIVE TEMPLATE PREVIEW CONTAINER */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-teal-100 dark:border-teal-900 sticky top-24">
                    <div ref={resumeRef} id="resume-preview" className="bg-white rounded-xl overflow-hidden shadow-inner">
                        <ResumePreview
                            formData={formData}
                            generatedResume={generatedResume}
                            setGeneratedResume={setGeneratedResume}
                            photo={photo}
                            downloadPDF={downloadPDF}
                            saveResume={saveResume}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
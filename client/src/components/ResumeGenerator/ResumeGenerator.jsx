import { useState } from "react";
import jsPDF from "jspdf";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import axiosInstance from "../../api/axiosInstance";

export default function ResumeGenerator() {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axiosInstance.post(
        "/resume-generator/generate",
        formData
      );

      setGeneratedResume(res.data.resume);
    } catch (error) {
      console.error(error);
      alert("Failed to generate Resume");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!generatedResume) return;

    const doc = new jsPDF();

    const resumeText = `
PROFESSIONAL SUMMARY
${generatedResume.summary || ""}

SKILLS
${generatedResume.skills?.join(", ") || ""}

PROJECTS
${generatedResume.projects?.join("\n") || ""}

EXPERIENCE
${generatedResume.experience?.join("\n") || ""}

ACHIEVEMENTS
${generatedResume.achievements?.join("\n") || ""}
`;

    const lines = doc.splitTextToSize(resumeText, 180);

    doc.text(lines, 10, 10);
    doc.save("resume.pdf");
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">
        AI Resume Generator
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        <ResumeForm formData={formData} handleChange={handleChange} handleGenerate={handleGenerate}
        loading={loading} setPhoto={setPhoto} />
        
        <div className="min-h-[1000px]">
          <ResumePreview formData={formData} generatedResume={generatedResume} photo={null} />
        </div>
      </div>
    </div>
  );
}
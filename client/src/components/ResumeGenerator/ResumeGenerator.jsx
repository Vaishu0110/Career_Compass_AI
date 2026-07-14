import { useState, useRef } from "react";
import jsPDF from "jspdf";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import axiosInstance from "../../api/axiosInstance";
import html2canvas from "html2canvas";

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
  const [editableResume, setEditableResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const resumeRef = useRef(null);

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
      setEditableResume(res.data.resume);
    } catch (error) {
      console.error(error);
      alert("Failed to generate Resume");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {

    const resume = resumeRef.current;
    
    if(!resume) return;

    const canvas = await html2canvas(resume, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "m", "a4");

    const pdfWidth =pdf.internal.pageSize.getWidth();

    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save(`${formData.fullName}_Resume.pdf`);
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
          <div ref={resumeRef}>
            <ResumePreview formData={formData} generatedResume={editableResume} setGeneratedResume={setEditableResume} photo={null} downloadPDF={downloadPDF} />
          </div>
        </div>
      </div>
    </div>
  );
}
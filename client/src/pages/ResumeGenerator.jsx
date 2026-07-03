import { useState } from "react";
import jsPDF from "jspdf";
import axiosInstance from "../api/axiosInstance";

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

        {/* FORM SECTION */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">
            Resume Details
          </h2>

          <form onSubmit={handleGenerate}>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border p-3 mb-4 rounded"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 mb-4 rounded"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-3 mb-4 rounded"
            />

            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn URL"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full border p-3 mb-4 rounded"
            />

            <input
              type="text"
              name="github"
              placeholder="GitHub URL"
              value={formData.github}
              onChange={handleChange}
              className="w-full border p-3 mb-4 rounded"
            />

            <input
              type="text"
              name="portfolio"
              placeholder="Portfolio URL"
              value={formData.portfolio}
              onChange={handleChange}
              className="w-full border p-3 mb-4 rounded"
            />

            <input
              type="text"
              name="targetRole"
              placeholder="Target Role"
              value={formData.targetRole}
              onChange={handleChange}
              className="w-full border p-3 mb-4 rounded"
            />

            <select
              name="template"
              value={formData.template}
              onChange={handleChange}
              className="w-full border p-3 mb-4 rounded"
            >
              <option value="Developer">Developer</option>
              <option value="Modern">Modern</option>
              <option value="Corporate">Corporate</option>
              <option value="Student">Student</option>
              <option value="Executive">Executive</option>
            </select>

            <textarea
              name="education"
              placeholder="Education"
              value={formData.education}
              onChange={handleChange}
              rows="3"
              className="w-full border p-3 mb-4 rounded"
            />

            <textarea
              name="skills"
              placeholder="Skills (comma separated)"
              value={formData.skills}
              onChange={handleChange}
              rows="3"
              className="w-full border p-3 mb-4 rounded"
            />

            <textarea
              name="projects"
              placeholder="Projects"
              value={formData.projects}
              onChange={handleChange}
              rows="4"
              className="w-full border p-3 mb-4 rounded"
            />

            <textarea
              name="experience"
              placeholder="Experience"
              value={formData.experience}
              onChange={handleChange}
              rows="4"
              className="w-full border p-3 mb-4 rounded"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
            >
              {loading
                ? "Generating Resume..."
                : "Generate Resume"}
            </button>

          </form>
        </div>

        {/* PREVIEW SECTION */}
        <div className="bg-white shadow-lg rounded-lg p-6 min-h-[800px]">
          <h2 className="text-2xl font-bold mb-6">
            Resume Preview
          </h2>

          {generatedResume ? (
            <>
              <div className="space-y-6">

                <div>
                  <h3 className="font-bold text-xl mb-2">
                    Professional Summary
                  </h3>
                  <p>{generatedResume.summary}</p>
                </div>

                <div>
                  <h3 className="font-bold text-xl mb-2">
                    Skills
                  </h3>
                  <ul className="list-disc pl-5">
                    {generatedResume.skills?.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">
                    Experience
                  </h3>
                  {generatedResume.projects?.map((project, index) => (
                    <div
                        key={index}
                        className="border rounded p-3 mb-3"
                        >
                        <h4 className="font-semibold">
                            {project.title}
                        </h4>
                        <p>{project.description}</p>
                        <p className="mt-2">
                            <strong>Technologies:</strong>{" "}
                            {project.technologies}
                        </p>
                        <ul className="list-disc pl-5 mt-2">
                            {project.impact?.map((item, i) => (
                            <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">
                    Achievements
                  </h3>
                  <ul className="list-disc pl-5">
                    {generatedResume.achievements?.map((ach, index) => (
                      <li key={index}>{ach}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                onClick={downloadPDF}
                className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Download PDF
              </button>
            </>
          ) : (
            <div className="text-gray-500">
              Your AI generated resume will appear here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
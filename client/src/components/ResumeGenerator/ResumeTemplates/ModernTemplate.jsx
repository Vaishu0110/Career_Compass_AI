// client/src/components/ResumeGenerator/ResumeTemplates/ModernTemplate.jsx
export default function ModernTemplate({
    formData,
    generatedResume,
    setGeneratedResume,
    photo,
    saveResume,
}) {
    const resume = generatedResume || {};

    const updatedResume = (field, value) => {
        setGeneratedResume((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const achievementsText = Array.isArray(resume.achievements)
        ? resume.achievements
              .map((ach) =>
                  typeof ach === "string" ? ach : ach.title || ach.description || ""
              )
              .join("\n\n")
        : resume.achievements || "";

    return (
        <div className="bg-white p-12 min-h-[1123px]">
            <h1 className="text-5xl font-extrabold text-blue-700">
                {resume.fullName || formData?.fullName || "Your Name"}
            </h1>

            <p className="text-xl text-gray-600 mt-2">
                {resume.targetRole || formData?.targetRole || "Target Role"}
            </p>

            <div className="flex flex-wrap gap-5 text-gray-500 text-sm mt-4">
                {(resume.email || formData?.email) && <span>{resume.email || formData.email}</span>}
                {(resume.phone || formData?.phone) && <span>{resume.phone || formData.phone}</span>}
                {resume.linkedin && <span>{resume.linkedin}</span>}
                {resume.github && <span>{resume.github}</span>}
                {resume.portfolio && <span>{resume.portfolio}</span>}
            </div>

            <hr className="my-5" />

            <h2 className="text-2xl font-bold text-blue-700 mt-8 pb-2 border-b-2 border-blue-200">
                Summary
            </h2>
            <textarea
                value={resume.summary || ""}
                onChange={(e) => updatedResume("summary", e.target.value)}
                className="w-full mt-3 p-3 border rounded text-gray-900 leading-7"
                rows={4}
                placeholder="Professional summary..."
            />

            <hr className="my-5" />

            <h2 className="font-bold text-2xl text-blue-700 mt-8 pb-2 border-b-2 border-blue-200">
                Education
            </h2>
            <textarea
                value={resume.education || ""}
                onChange={(e) => updatedResume("education", e.target.value)}
                className="w-full mt-3 p-3 border rounded text-gray-900 leading-7"
                rows={4}
                placeholder="Education details..."
            />

            <hr className="my-5" />

            <h2 className="font-bold text-2xl text-blue-700 mt-8 pb-2 border-b-2 border-blue-200">
                Experience
            </h2>
            <textarea
                value={
                    Array.isArray(resume.experience)
                        ? resume.experience
                              .map((exp) =>
                                  typeof exp === "string" ? exp : exp.title || exp.description || ""
                              )
                              .join("\n\n")
                        : resume.experience || ""
                }
                onChange={(e) => updatedResume("experience", e.target.value)}
                className="w-full mt-3 p-3 border rounded text-gray-900 leading-7"
                rows={6}
                placeholder="Work experience..."
            />

            <hr className="my-5" />

            <h2 className="font-bold text-2xl text-blue-700 mt-8 pb-2 border-b-2 border-blue-200">
                Skills
            </h2>

            <div className="flex flex-wrap gap-3 mt-3">
                {(Array.isArray(resume.skills) ? resume.skills : (resume.skills || "").split(", "))
                    .filter((skill) => skill.trim())
                    .map((skill, index) => (
                        <span key={index} className="bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-sm shadow-sm">
                            {skill.trim()}
                        </span>
                    ))}
            </div>

            <hr className="my-5" />

            <h2 className="font-bold text-2xl text-blue-700 mt-8 pb-2 border-b-2 border-blue-200">
                Projects
            </h2>
            <textarea
                value={
                    Array.isArray(resume.projects)
                        ? resume.projects
                              .map((proj) =>
                                  typeof proj === "string" ? proj : proj.title || proj.description || ""
                              )
                              .join("\n\n")
                        : resume.projects || ""
                }
                onChange={(e) => updatedResume("projects", e.target.value)}
                className="w-full mt-3 p-3 border rounded text-gray-900 leading-7"
                rows={6}
                placeholder="Projects..."
            />

            <hr className="my-5" />

            <h2 className="font-bold text-2xl text-blue-700 mt-8 pb-2 border-b-2 border-blue-200">
                Achievements
            </h2>
            <textarea
                value={achievementsText}
                onChange={(e) => updatedResume("achievements", e.target.value)}
                className="w-full mt-3 p-3 border rounded text-gray-900 leading-7"
                rows={4}
                placeholder="List your key achievements..."
            />

            <div className="flex gap-3 pt-6">
                <button
                    onClick={saveResume}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3 rounded-xl shadow transition text-xs uppercase tracking-wider"
                >
                    💾 Save Resume
                </button>
            </div>

            <div className="text-center mt-12 text-xs text-gray-400">
                Generated by Career Compass AI
            </div>
        </div>
    );
}
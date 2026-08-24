// client/src/components/ResumeGenerator/ResumeTemplates/ProfessionalTemplate.jsx
export default function ProfessionalTemplate({
    formData,
    generatedResume,
    setGeneratedResume,
    saveResume,
}) {
    const resume = generatedResume || {};
    const skills = Array.isArray(resume.skills)
        ? resume.skills
        : (resume.skills || "").split(",").filter((skill) => skill.trim());

    const updateResume = (field, value) => {
        setGeneratedResume((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const projectsText = Array.isArray(resume.projects)
        ? resume.projects
              .map((project) =>
                  typeof project === "string" ? project : project.title || project.description || ""
              )
              .join("\n\n")
        : resume.projects || "";

    const experienceText = Array.isArray(resume.experience)
        ? resume.experience
              .map((experience) =>
                  typeof experience === "string" ? experience : experience.title || experience.description || ""
              )
              .join("\n\n")
        : resume.experience || "";

    const achievementsText = Array.isArray(resume.achievements)
        ? resume.achievements
              .map((ach) =>
                  typeof ach === "string" ? ach : ach.title || ach.description || ""
              )
              .join("\n\n")
        : resume.achievements || "";

    return (
        <div className="bg-white p-12 min-h-[1123px]">
            {/* HEADER */}
            <div className="border-b-4 border-blue-700 pb-8">
                <h1 className="text-5xl font-bold text-gray-900">
                    {resume.fullName || formData?.fullName || "Your Name"}
                </h1>

                <p className="text-2xl text-blue-700 mt-3">
                    {resume.targetRole || formData?.targetRole || "Professional"}
                </p>

                <div className="flex flex-wrap gap-6 mt-5 text-gray-600 text-sm">
                    {(resume.email || formData?.email) && <span>{resume.email || formData.email}</span>}
                    {(resume.phone || formData?.phone) && <span>{resume.phone || formData.phone}</span>}
                    {resume.linkedin && <span>{resume.linkedin}</span>}
                    {resume.github && <span>{resume.github}</span>}
                    {resume.portfolio && <span>{resume.portfolio}</span>}
                </div>
            </div>

            <div className="mt-8 space-y-8">
                {/* SUMMARY */}
                <section>
                    <h2 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2">
                        Professional Summary
                    </h2>

                    <textarea
                        value={resume.summary || ""}
                        onChange={(e) => updateResume("summary", e.target.value)}
                        className="w-full mt-4 p-3 border rounded text-gray-900 leading-7"
                        rows={6}
                        placeholder="Professional Summary"
                    />
                </section>

                {/* EXPERIENCE */}
                <section>
                    <h2 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2">
                        Professional Experience
                    </h2>

                    <textarea
                        value={experienceText}
                        onChange={(e) => updateResume("experience", e.target.value)}
                        className="w-full mt-4 p-3 border rounded text-gray-900 leading-7"
                        rows={8}
                        placeholder="Professional Experience"
                    />
                </section>

                {/* PROJECTS */}
                <section>
                    <h2 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2">
                        Projects
                    </h2>

                    <textarea
                        value={projectsText}
                        onChange={(e) => updateResume("projects", e.target.value)}
                        className="w-full mt-4 p-3 border rounded text-gray-900 leading-7"
                        rows={8}
                        placeholder="Projects"
                    />
                </section>

                {/* SKILLS */}
                <section>
                    <h2 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2">
                        Skills
                    </h2>

                    <div className="flex flex-wrap gap-3 mt-4">
                        {skills.length > 0 ? (
                            skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-sm shadow-sm"
                                >
                                    {skill.trim()}
                                </span>
                            ))
                        ) : (
                            <p className="text-gray-500">No skills added.</p>
                        )}
                    </div>
                </section>

                {/* EDUCATION */}
                <section>
                    <h2 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2">
                        Education
                    </h2>

                    <textarea
                        value={resume.education || ""}
                        onChange={(e) => updateResume("education", e.target.value)}
                        className="w-full mt-4 p-3 border rounded text-gray-900 leading-7"
                        rows={5}
                        placeholder="Education"
                    />
                </section>

                {/* ACHIEVEMENTS */}
                <section>
                    <h2 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2">
                        Achievements
                    </h2>

                    <textarea
                        value={achievementsText}
                        onChange={(e) => updateResume("achievements", e.target.value)}
                        className="w-full mt-4 p-3 border rounded text-gray-900 leading-7"
                        rows={5}
                        placeholder="List your key achievements..."
                    />
                </section>

                {/* BUTTONS */}
                <div className="flex gap-3 pt-6">
                    <button
                        onClick={saveResume}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3 rounded-xl shadow transition text-xs uppercase tracking-wider"
                    >
                        💾 Save Resume
                    </button>
                </div>

                <div className="text-center text-gray-400 text-sm pt-4">
                    Generated by Career Compass AI
                </div>
            </div>
        </div>
    );
}
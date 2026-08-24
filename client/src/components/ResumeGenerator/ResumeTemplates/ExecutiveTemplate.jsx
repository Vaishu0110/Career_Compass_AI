// client/src/components/ResumeGenerator/ResumeTemplates/ExecutiveTemplate.jsx
export default function ExecutiveTemplate({
    formData,
    generatedResume,
    setGeneratedResume,
    photo,
    saveResume,
}) {
    const resume = generatedResume || {};
    const skills = Array.isArray(resume.skills)
        ? resume.skills
        : (resume.skills || "").split(",").filter((skill) => skill.trim());

    const updatedResume = (field, value) => {
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
        <div className="bg-white text-slate-900 p-10 md:p-12 min-h-[1123px] font-sans shadow-lg">
            {/* EXECUTIVE HEADER */}
            <div className="bg-slate-900 text-white p-8 rounded-xl shadow-md border-b-4 border-amber-500">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-wide text-white">
                            {resume.fullName || formData?.fullName || "Your Full Name"}
                        </h1>
                        <p className="text-xl md:text-2xl text-amber-400 font-bold mt-2">
                            {resume.targetRole || formData?.targetRole || "Executive Leader"}
                        </p>
                    </div>

                    {photo && (
                        <img
                            src={photo}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-amber-400 shadow-md shrink-0"
                        />
                    )}
                </div>

                <div className="flex flex-wrap gap-4 mt-5 text-slate-300 text-xs md:text-sm font-medium border-t border-slate-800 pt-4">
                    {(resume.email || formData?.email) && <span>📧 {resume.email || formData.email}</span>}
                    {(resume.phone || formData?.phone) && <span>📞 {resume.phone || formData.phone}</span>}
                    {resume.linkedin && <span>🔗 {resume.linkedin}</span>}
                    {resume.github && <span>💻 {resume.github}</span>}
                    {resume.portfolio && <span>🌐 {resume.portfolio}</span>}
                </div>
            </div>

            {/* DOCUMENT BODY */}
            <div className="py-8 space-y-8">
                {/* EXECUTIVE SUMMARY */}
                <section>
                    <h2 className="text-xl font-black text-amber-700 uppercase tracking-wider border-b-2 border-amber-500 pb-1.5 mb-3">
                        Executive Summary
                    </h2>
                    <textarea
                        value={resume.summary || ""}
                        onChange={(e) => updatedResume("summary", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 font-medium leading-relaxed focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        rows={4}
                        placeholder="Type your executive summary..."
                    />
                </section>

                {/* EXPERIENCE */}
                <section>
                    <h2 className="text-xl font-black text-amber-700 uppercase tracking-wider border-b-2 border-amber-500 pb-1.5 mb-3">
                        Professional Experience
                    </h2>
                    <textarea
                        value={experienceText}
                        onChange={(e) => updatedResume("experience", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 font-medium leading-relaxed focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        rows={6}
                        placeholder="Detail your work experience..."
                    />
                </section>

                {/* MAJOR PROJECTS */}
                <section>
                    <h2 className="text-xl font-black text-amber-700 uppercase tracking-wider border-b-2 border-amber-500 pb-1.5 mb-3">
                        Major Projects & Initiatives
                    </h2>
                    <textarea
                        value={projectsText}
                        onChange={(e) => updatedResume("projects", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 font-medium leading-relaxed focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        rows={6}
                        placeholder="Detail key projects..."
                    />
                </section>

                {/* CORE COMPETENCIES / SKILLS */}
                <section>
                    <h2 className="text-xl font-black text-amber-700 uppercase tracking-wider border-b-2 border-amber-500 pb-1.5 mb-3">
                        Core Competencies & Skills
                    </h2>
                    <div className="flex flex-wrap gap-2.5 mt-3">
                        {skills.length > 0 ? (
                            skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-slate-900 text-amber-400 font-bold px-3.5 py-1.5 rounded-lg text-xs shadow-sm border border-slate-800"
                                >
                                    {skill.trim()}
                                </span>
                            ))
                        ) : (
                            <p className="text-xs text-slate-500 font-medium">No skills added.</p>
                        )}
                    </div>
                </section>

                {/* EDUCATION */}
                <section>
                    <h2 className="text-xl font-black text-amber-700 uppercase tracking-wider border-b-2 border-amber-500 pb-1.5 mb-3">
                        Education & Qualifications
                    </h2>
                    <textarea
                        value={resume.education || ""}
                        onChange={(e) => updatedResume("education", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 font-medium leading-relaxed focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        rows={3}
                        placeholder="Detail your education..."
                    />
                </section>

                {/* ACHIEVEMENTS */}
                <section>
                    <h2 className="text-xl font-black text-amber-700 uppercase tracking-wider border-b-2 border-amber-500 pb-1.5 mb-3">
                        Key Leadership Achievements
                    </h2>
                    <textarea
                        value={achievementsText}
                        onChange={(e) => updatedResume("achievements", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 font-medium leading-relaxed focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        rows={4}
                        placeholder="List your key achievements..."
                    />
                </section>
            </div>

            {/* ACTION TOOLBAR */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200">
                <button
                    onClick={saveResume}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow transition transform active:scale-95"
                >
                    💾 Save Resume
                </button>
            </div>

            <div className="text-center text-slate-400 text-xs pt-8">
                Generated by Career Compass AI
            </div>
        </div>
    );
}
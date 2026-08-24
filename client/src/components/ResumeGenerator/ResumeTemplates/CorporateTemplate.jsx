// client/src/components/ResumeGenerator/ResumeTemplates/CorporateTemplate.jsx
export default function CorporateTemplate({
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

    const achievementsText = Array.isArray(resume.achievements)
        ? resume.achievements
              .map((ach) =>
                  typeof ach === "string" ? ach : ach.title || ach.description || ""
              )
              .join("\n\n")
        : resume.achievements || "";

    return (
        <div className="bg-white text-slate-900 p-10 md:p-12 min-h-[1123px] font-sans shadow-lg">
            {/* HEADER */}
            <div className="border-b-4 border-blue-900 pb-6 mb-6">
                <h1 className="text-4xl md:text-5xl font-black text-slate-900">
                    {resume.fullName || formData?.fullName || "Your Full Name"}
                </h1>

                <p className="text-xl text-blue-800 font-bold mt-2">
                    {resume.targetRole || formData?.targetRole || "Corporate Professional"}
                </p>

                <div className="flex flex-wrap gap-4 mt-4 text-slate-600 text-xs md:text-sm font-medium">
                    {(resume.email || formData?.email) && <span>📧 {resume.email || formData.email}</span>}
                    {(resume.phone || formData?.phone) && <span>📞 {resume.phone || formData.phone}</span>}
                    {resume.linkedin && <span>🔗 {resume.linkedin}</span>}
                    {resume.github && <span>💻 {resume.github}</span>}
                    {resume.portfolio && <span>🌐 {resume.portfolio}</span>}
                </div>
            </div>

            {/* 2-COLUMN GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* LEFT SIDEBAR */}
                <div className="space-y-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <div>
                        <h2 className="font-black text-slate-900 text-sm uppercase tracking-wider mb-3">
                            Technical Skills
                        </h2>
                        <div className="space-y-2">
                            {skills.length > 0 ? (
                                skills.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="bg-blue-800 text-white font-bold rounded-lg px-3 py-1.5 text-xs shadow-sm"
                                    >
                                        {typeof skill === "string" ? skill.trim() : skill.name || skill.title || ""}
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-slate-500 font-medium">No skills added.</p>
                            )}
                        </div>
                    </div>

                    <div className="border-t border-slate-200 pt-6">
                        <h2 className="font-black text-slate-900 text-sm uppercase tracking-wider mb-3">
                            Education
                        </h2>
                        <textarea
                            value={resume.education || ""}
                            onChange={(e) => updatedResume("education", e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-blue-700 focus:outline-none"
                            rows={5}
                            placeholder="Education details..."
                        />
                    </div>
                </div>

                {/* RIGHT MAIN BODY */}
                <div className="md:col-span-2 space-y-6">
                    <section>
                        <h2 className="text-lg font-black text-blue-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-3">
                            Executive Summary
                        </h2>
                        <textarea
                            value={resume.summary || ""}
                            onChange={(e) => updatedResume("summary", e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 font-medium leading-relaxed focus:ring-2 focus:ring-blue-700 focus:outline-none"
                            rows={5}
                            placeholder="Professional summary..."
                        />
                    </section>

                    <section>
                        <h2 className="text-lg font-black text-blue-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-3">
                            Work Experience
                        </h2>
                        <textarea
                            value={resume.experience || ""}
                            onChange={(e) => updatedResume("experience", e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 font-medium leading-relaxed focus:ring-2 focus:ring-blue-700 focus:outline-none"
                            rows={7}
                            placeholder="Work experience..."
                        />
                    </section>

                    <section>
                        <h2 className="text-lg font-black text-blue-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-3">
                            Key Projects
                        </h2>
                        <textarea
                            value={
                                Array.isArray(resume.projects)
                                    ? resume.projects
                                          .map((project) =>
                                              typeof project === "string"
                                                  ? project
                                                  : project.title || project.description || ""
                                          )
                                          .join("\n\n")
                                    : resume.projects || ""
                            }
                            onChange={(e) => updatedResume("projects", e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 font-medium leading-relaxed focus:ring-2 focus:ring-blue-700 focus:outline-none"
                            rows={6}
                            placeholder="Key projects..."
                        />
                    </section>

                    <section>
                        <h2 className="text-lg font-black text-blue-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-3">
                            Achievements
                        </h2>
                        <textarea
                            value={achievementsText}
                            onChange={(e) => updatedResume("achievements", e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 font-medium leading-relaxed focus:ring-2 focus:ring-blue-700 focus:outline-none"
                            rows={4}
                            placeholder="Key achievements..."
                        />
                    </section>
                </div>
            </div>

            {/* ACTION TOOLBAR */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200 mt-8">
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
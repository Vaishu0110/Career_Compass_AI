// client/src/components/ResumeGenerator/ResumeTemplates/StudentTemplate.jsx
export default function StudentTemplate({
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
            {/* HEADER */}
            <div className="bg-emerald-700 text-white p-8 rounded-xl text-center shadow-md">
                <h1 className="text-4xl md:text-5xl font-black text-white">
                    {resume.fullName || formData?.fullName || "Your Full Name"}
                </h1>

                <p className="text-xl text-emerald-200 font-bold mt-2">
                    {resume.targetRole || formData?.targetRole || "Student / Graduate"}
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-4 text-emerald-100 text-xs md:text-sm font-medium">
                    {(resume.email || formData?.email) && <span>📧 {resume.email || formData.email}</span>}
                    {(resume.phone || formData?.phone) && <span>📞 {resume.phone || formData.phone}</span>}
                    {resume.linkedin && <span>🔗 {resume.linkedin}</span>}
                    {resume.github && <span>💻 {resume.github}</span>}
                    {resume.portfolio && <span>🌐 {resume.portfolio}</span>}
                </div>
            </div>

            {/* DOCUMENT BODY */}
            <div className="py-8 space-y-8">
                {/* CAREER OBJECTIVE */}
                <section>
                    <h2 className="text-xl font-black text-emerald-800 uppercase tracking-wider border-b-2 border-emerald-300 pb-1.5 mb-3">
                        Career Objective
                    </h2>
                    <textarea
                        value={resume.summary || ""}
                        onChange={(e) => updatedResume("summary", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 font-medium leading-relaxed focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        rows={4}
                        placeholder="Type your career objective..."
                    />
                </section>

                {/* EDUCATION */}
                <section>
                    <h2 className="text-xl font-black text-emerald-800 uppercase tracking-wider border-b-2 border-emerald-300 pb-1.5 mb-3">
                        Education History
                    </h2>
                    <textarea
                        value={resume.education || ""}
                        onChange={(e) => updatedResume("education", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 font-medium leading-relaxed focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        rows={4}
                        placeholder="Detail your academic background..."
                    />
                </section>

                {/* SKILLS */}
                <section>
                    <h2 className="text-xl font-black text-emerald-800 uppercase tracking-wider border-b-2 border-emerald-300 pb-1.5 mb-3">
                        Technical & Soft Skills
                    </h2>
                    <div className="flex flex-wrap gap-2.5 mt-3">
                        {skills.length > 0 ? (
                            skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-emerald-700 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs shadow-sm"
                                >
                                    {skill.trim()}
                                </span>
                            ))
                        ) : (
                            <p className="text-xs text-slate-500 font-medium">No skills added.</p>
                        )}
                    </div>
                </section>

                {/* ACADEMIC PROJECTS */}
                <section>
                    <h2 className="text-xl font-black text-emerald-800 uppercase tracking-wider border-b-2 border-emerald-300 pb-1.5 mb-3">
                        Academic Projects
                    </h2>
                    <textarea
                        value={projectsText}
                        onChange={(e) => updatedResume("projects", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 font-medium leading-relaxed focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        rows={6}
                        placeholder="Detail academic projects..."
                    />
                </section>

                {/* EXPERIENCE / INTERNSHIPS */}
                <section>
                    <h2 className="text-xl font-black text-emerald-800 uppercase tracking-wider border-b-2 border-emerald-300 pb-1.5 mb-3">
                        Internships & Experience
                    </h2>
                    <textarea
                        value={experienceText}
                        onChange={(e) => updatedResume("experience", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 font-medium leading-relaxed focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        rows={5}
                        placeholder="Detail internships or work experience..."
                    />
                </section>

                {/* ACHIEVEMENTS */}
                <section>
                    <h2 className="text-xl font-black text-emerald-800 uppercase tracking-wider border-b-2 border-emerald-300 pb-1.5 mb-3">
                        Certifications & Achievements
                    </h2>
                    <textarea
                        value={achievementsText}
                        onChange={(e) => updatedResume("achievements", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 font-medium leading-relaxed focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        rows={4}
                        placeholder="List academic honors or achievements..."
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
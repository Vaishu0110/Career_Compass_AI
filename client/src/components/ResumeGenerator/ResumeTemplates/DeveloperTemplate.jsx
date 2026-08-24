// client/src/components/ResumeGenerator/ResumeTemplates/DeveloperTemplate.jsx
export default function DeveloperTemplate({
    formData,
    generatedResume,
    setGeneratedResume,
    photo,
    saveResume,
}) {
    const resume = generatedResume || {};

    const getValue = (resumeValue, formValue = "") => {
        if (resumeValue !== undefined && resumeValue !== null && resumeValue !== "") {
            return resumeValue;
        }
        return formValue || "";
    };

    const skills = Array.isArray(resume.skills)
        ? resume.skills
        : typeof resume.skills === "string"
        ? resume.skills
              .split(", ")
              .map((skill) => skill.trim())
              .filter(Boolean)
        : typeof formData?.skills === "string"
        ? formData?.skills
              ?.split(", ")
              .map((skill) => skill.trim())
              .filter(Boolean)
        : [];

    const updatedResume = (field, value) => {
        setGeneratedResume((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const getTextValue = (value) => {
        if (Array.isArray(value)) {
            return value.join("\n\n");
        }
        return value || "";
    };

    return (
        <div className="bg-white min-h-[1123px] p-8 md:p-12 text-gray-900">
            <div className="bg-gray-900 text-white p-8 rounded-t-lg">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold">
                            {getValue(resume.fullName, formData.fullName) || "Your Name"}
                        </h1>

                        <p className="text-xl text-green-400 mt-2">
                            {getValue(resume.targetRole, formData.targetRole)}
                        </p>
                    </div>

                    {photo && (
                        <img
                            src={photo}
                            alt="Profile"
                            className="w-28 h-28 rounded-full object-cover border-4 border-white"
                        />
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="bg-gray-100 p-6">
                    <section>
                        <h2 className="text-xl font-bold mb-4 text-gray-900">Contact</h2>

                        <div className="space-y-3 text-sm break-words text-gray-800">
                            {getValue(resume.email, formData.email) && (
                                <p>{getValue(resume.email, formData.email)}</p>
                            )}

                            {getValue(resume.phone, formData.phone) && (
                                <p>{getValue(resume.phone, formData.phone)}</p>
                            )}

                            {getValue(resume.github, formData.github) && (
                                <p>{getValue(resume.github, formData.github)}</p>
                            )}

                            {getValue(resume.linkedin, formData.linkedin) && (
                                <p>{getValue(resume.linkedin, formData.linkedin)}</p>
                            )}

                            {getValue(resume.portfolio, formData.portfolio) && (
                                <p>{getValue(resume.portfolio, formData.portfolio)}</p>
                            )}
                        </div>
                    </section>

                    <hr className="my-6" />

                    <section>
                        <h2 className="text-xl font-bold mb-4 text-gray-900">Tech Skills</h2>

                        {skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl text-sm shadow-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">No skills added yet.</p>
                        )}
                    </section>
                </div>

                <div className="md:col-span-2 p-6 md:p-8 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold border-b-2 border-green-500 pb-2">
                            Professional Summary
                        </h2>

                        <textarea
                            value={resume.summary || ""}
                            onChange={(e) => updatedResume("summary", e.target.value)}
                            className="w-full mt-4 p-3 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                            rows={5}
                            placeholder="Professional Summary..."
                        />
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold border-b-2 border-green-500 pb-2">
                            Experience
                        </h2>

                        <textarea
                            value={getTextValue(resume.experience)}
                            onChange={(e) => updatedResume("experience", e.target.value)}
                            className="w-full mt-4 p-3 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                            rows={7}
                            placeholder="Work Experience..."
                        />
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold border-b-2 border-green-500 pb-2">
                            Projects
                        </h2>

                        <textarea
                            value={getTextValue(resume.projects)}
                            onChange={(e) => updatedResume("projects", e.target.value)}
                            className="w-full mt-4 p-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                            rows={7}
                            placeholder="Projects..."
                        />
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold border-b-2 border-green-500 pb-2">
                            Achievements
                        </h2>

                        <textarea
                            value={getTextValue(resume.achievements)}
                            onChange={(e) => updatedResume("achievements", e.target.value)}
                            className="w-full mt-4 p-3 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                            rows={5}
                            placeholder="Achievements..."
                        />
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold border-b-2 border-green-500 pb-2">
                            Education
                        </h2>

                        <textarea
                            value={getTextValue(getValue(resume.education, formData.education))}
                            onChange={(e) => updatedResume("education", e.target.value)}
                            className="w-full mt-4 p-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                            rows={4}
                            placeholder="Education details..."
                        />
                    </section>
                </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
                <button
                    onClick={saveResume}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3 rounded-xl shadow transition text-xs uppercase tracking-wider"
                >
                    💾 Save Resume
                </button>
            </div>
        </div>
    );
}
import ResumePhotoUpload from "./ResumePhotoUpload";

export default function ResumeForm({
    formData,
    handleChange,
    handleGenerate,
    loading,
    setPhoto,
}) {
    return (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-teal-100 space-y-6">
            <h2 className="text-xl font-bold text-teal-500 flex items-center gap-2">
                Personal & Professional Details
            </h2>
            <form onSubmit={handleGenerate} className="space-y-4">
                
                {/* NAME & EMAIL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-teal-600 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="e.g. Rubina Shastri"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="[&::placeholder]:opacity-20 w-full border border-teal-200 rounded-2xl p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-teal-600 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="rubinashastri@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="[&::placeholder]:opacity-20 w-full border border-teal-200 rounded-2xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                </div>
                {/* PHONE & TARGET ROLE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-teal-600 mb-1">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="+91 9876556789"
                            value={formData.phone}
                            onChange={handleChange}
                            className="[&::placeholder]:opacity-20 w-full border border-teal-200 rounded-2xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-teal-600 mb-1">
                            Target Role
                        </label>
                        <input
                            type="text"
                            name="targetRole"
                            placeholder="e.g. Full Stack Developer"
                            value={formData.targetRole}
                            onChange={handleChange}
                            required
                            className="[&::placeholder]:opacity-20 w-full border border-teal-200 rounded-2xl p-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                </div>
                {/* TEMPLATE PICKER */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-teal-600 mb-1">
                        Resume Design Template
                    </label>
                    <select
                        name="template"
                        value={formData.template}
                        onChange={handleChange}
                        className="w-full border border-teal-200 rounded-2xl p-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        <option value="Modern">Modern Design</option>
                        <option value="Professional">Professional Corporate</option>
                        <option value="Developer">Developer / Tech Focus</option>
                        <option value="Corporate">Corporate Executive</option>
                        <option value="Student">Student / Entry Level</option>
                        <option value="Executive">Executive Leadership</option>
                    </select>
                </div>
                {/* SOCIAL LINKS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                        type="text"
                        name="linkedin"
                        placeholder="LinkedIn URL"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="[&::placeholder]:opacity-30 w-full border border-teal-200 dark:border-teal-800 dark:bg-slate-900 rounded-2xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <input
                        type="text"
                        name="github"
                        placeholder="GitHub URL"
                        value={formData.github}
                        onChange={handleChange}
                        className="[&::placeholder]:opacity-30 w-full border border-teal-200 dark:border-teal-800 dark:bg-slate-900 rounded-2xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <input
                        type="text"
                        name="portfolio"
                        placeholder="Portfolio URL"
                        value={formData.portfolio}
                        onChange={handleChange}
                        className="[&::placeholder]:opacity-30 w-full border border-teal-200 dark:border-teal-800 dark:bg-slate-900 rounded-2xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
                {/* TEXTAREAS */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-teal-600 mb-1">
                        Education History
                    </label>
                    <textarea
                        rows="2"
                        name="education"
                        placeholder="e.g. B.S. in Computer Science - University of Tech (2020-2024)"
                        value={formData.education}
                        onChange={handleChange}
                        className="[&::placeholder]:opacity-20 w-full border border-teal-200 rounded-2xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-teal-600 mb-1">
                        Skills
                    </label>
                    <textarea
                        rows="3"
                        name="skills"
                        placeholder="e.g. React, Node.js, Express, MongoDB, Tailwind, Git..."
                        value={formData.skills}
                        onChange={handleChange}
                        required
                        className="[&::placeholder]:opacity-20 w-full border border-teal-200 rounded-2xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-teal-600 mb-1">
                        Projects
                    </label>
                    <textarea
                        rows="3"
                        name="projects"
                        placeholder="Describe key projects, tech stack used, and accomplishments..."
                        value={formData.projects}
                        onChange={handleChange}
                        required
                        className="[&::placeholder]:opacity-20 w-full border border-teal-200 rounded-2xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-teal-600 mb-1">
                        Work Experience
                    </label>
                    <textarea
                        rows="3"
                        name="experience"
                        placeholder="Describe prior roles, responsibilities, and achievements..."
                        value={formData.experience}
                        onChange={handleChange}
                        className="[&::placeholder]:opacity-20 w-full border border-teal-200 rounded-2xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
                <ResumePhotoUpload setPhoto={setPhoto} />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold py-4 rounded-2xl shadow-lg hover:shadow-xl transition transform active:scale-95 text-base mt-4"
                >
                    {loading ? "Generating Resume with AI..." : "Generate AI Resume"}
                </button>
            </form>
        </div>
    );
}
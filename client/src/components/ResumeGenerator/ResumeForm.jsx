import ResumePhotoUpload from "./ResumePhotoUpload";

export default function ResumeForm({
    formData,
    handleChange,
    handleGenerate,
    loading,
    setPhoto,
}) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6">

            <h2 className="text-2xl font-bold mb-6">
                Resume Details
            </h2>

            <form onSubmit={handleGenerate}>

                <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName}
                onChange={handleChange} className="w-full border p-3 rounded mb-4" />
                
                <input type="email" name="email" placeholder="Email" value={formData.email}
                onChange={handleChange} className="w-full border p-3 rounded mb-4" />
                
                <input type="text" name="phone" placeholder="Phone" value={formData.phone}
                onChange={handleChange} className="w-full border p-3 rounded mb-4" />

                <input type="text" name="linkedin" placeholder="LinkedIn" value={formData.linkedin}
                onChange={handleChange} className="w-full border p-3 rounded mb-4" />

                <input type="text" name="github" placeholder="GitHub" value={formData.github}
                onChange={handleChange} className="w-full border p-3 rounded mb-4" />

                <input type="text" name="portfolio" placeholder="Portfolio" value={formData.portfolio}
                onChange={handleChange} className="w-full border p-3 rounded mb-4" />

                <input type="text" name="targetRole" placeholder="Target Role" value={formData.targetRole}
                onChange={handleChange} className="w-full border p-3 rounded mb-4" />

                <select name="template" value={formData.template} onChange={handleChange} className="w-full border p-3 rounded mb-4">
                    <option value="Developer">Developer</option>
                    <option value="Modern">Modern</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Student">Student</option>
                    <option value="Executive">Executive</option>
                </select>

                <textarea rows="3" name="education" placeholder="Education" value={formData.education}
                onChange={handleChange} className="w-full border p-3 rounded mb-4" />

                <textarea rows="3" name="skills" placeholder="Skills" value={formData.skills}
                onChange={handleChange} className="w-full border p-3 rounded mb-4" />

                <textarea rows="4" name="projects" placeholder="Projects" value={formData.projects}
                onChange={handleChange} className="w-full border p-3 rounded mb-4" />

                <textarea rows="4" name="experience" placeholder="Experience" value={formData.experience}
                onChange={handleChange} className="w-full border p-3 rounded mb-4" />

                <ResumePhotoUpload setPhoto={setPhoto} />

                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded mt-6">
                    {loading ? "Generating..." : "Generate Resume" }
                </button>
            </form>
        </div>
    );
}
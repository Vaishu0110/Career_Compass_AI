export default function DeveloperTemplate({ resume }) {
    const skill = (resume.skills || "").split(",").filter(skill => skill.trim());
    return (
        <div className="bg-white shadow-xl rounded-xl overflow-hidden max-w-5xl mx-auto border">

            <div className="bg-gray-900 text-white p-8">

                <h1 className="text-5xl font-bold">
                    {resume.fullName || "Your Name"}
                </h1>

                <p className="text-xl text-green-400 mt-2">
                    {resume.targetRole || "Software Developer"}
                </p>

            </div>

            <div className="grid grid-cols-3">

                <div className="bg-gray-100 p-6">
                    <h2 className="text-xl font-bold mb-4">
                        Contact
                    </h2>

                    <div className="space-y-2 text-sm">

                        <p>{resume.email}</p>
                        <p>{resume.phone}</p>
                        {resume.github && <p>{resume.github}</p>}
                        {resume.linkedin && <p>{resume.linkedin}</p>}
                        {resume.portfolio && <p>{resume.portfolio}</p>}
                    </div>

                    <hr className="my-6" />

                    <h2 className="text-xl font-bold mb-4">
                        Tech Skills
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                            <span key={index} className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                                {skill.trin()}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="col-span-2 p-8 space-y-8">

                    <section>

                        <h2 className="text-2xl font-bold border-b-2 border-green-500 pb-2">
                            Professional Summary
                        </h2>
                        <p className="mt-4 whitespace-pre-wrap leading">
                            {resume.summary}
                        </p>

                    </section>

                    <section>
                        <h2 className="text-2xl font-bold border-b-2 border-green-500 pb-2">
                            Experience
                        </h2>

                        <p className="mt-4 whitespace-pre-wrap leading-7">
                            {resume.experience}
                        </p>

                    </section>

                    <section>

                        <h2 className="text-2xl font-bold border-b-2 border-green-500 pb-2">
                            Projects
                        </h2>

                        <p className="mt-4 whitespace-pre-wrap leading-7">
                            {resume.projects}
                        </p>

                    </section>

                    <section>

                        <h2 className="text-2xl font-bold border-b-2 border-green-500 pb-2">
                            Education
                        </h2>

                        <p className="text-2xl font-bold border-b-2 border-green-500 pb-2">
                            {resume.education}
                        </p>
                        
                    </section>
                </div>
            </div>
        </div>
    );
}
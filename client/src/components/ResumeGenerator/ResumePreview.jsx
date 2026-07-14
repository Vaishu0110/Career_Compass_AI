export default function ResumePreview({
    formData,
    generatedResume,
    photo,
}) {
    if(!generatedResume) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500">
                Your AI generated resume will appear here.
            </div>
        );
    }

    return (
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden min-h-[1050px] border">

            <div className="bg-blue-700 text-white px-10 py-8 flex justify-between items-center">

                <div>
                    <h1 className="text-4xl font-bold tracking-wide">
                        {formData.fullName}
                    </h1>

                    <p className="text-xll mt-2 text-blue-100">
                        {formData.targetRole}
                    </p>
                </div>

                {photo && (
                    <img src={photo} alt="Profile" className="w-32 h-32 rounded-full border-4 border-white object-cover" />
                )}
            </div>

            <div className="grid grid-cols-3">

                <div className="bg-gray-100 p-8">
                    
                    <h2 className="font-bold text-lg mb-4">
                        CONTACT
                    </h2>

                    <div className="space-y-2 text-sm">
                        <p>
                            {formData.email}
                        </p>

                        <p>
                            {formData.phone}
                        </p>

                        { formData.linkenin && (<p>
                            {formData.linkedin}
                        </p> )}

                        { formData.github && (<p>
                            {formData.github}
                        </p>
                        )}

                        { formData.portfolio && (<p>
                            {formData.portfolio}
                        </p>
                        )}
                    </div>
                </div>

                <div>

                    <h2 className="text-lg font-bold border-b-2 border-blue-600 pb-2">
                        SKILLS
                    </h2>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {generatedResume.skills?.map((skill, index) => (
                            <span key={index} className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                                {skill}
                            </span>
                        ))}
                    </div>

                </div>

                <div>

                    <h2 className="text-lg font-bold border-b-2 border-blue-600 pb-2">
                        EDUCATION
                    </h2>

                    <p className="mt-4 whitespace-pre-line text-sm">
                        {formData.education}
                    </p>
                </div>

                <div className="col-span-2 p-8 space-y-10">

                    <section>
                        <h2 className="text-xl font-bold border-b-2 border-blue-600 pb-2">
                            PROFESSIONAL SUMMARY
                        </h2>

                        <p className="mt-4 leading-8 text-gray-700">
                            {generatedResume.summary}
                        </p>

                    </section>

                    <section>
                        <h2 className="text-xl font-bold border-b-2 border-blue-600 pb-2">
                            EXPERIENCE
                        </h2>

                        <div className="mt-5 space-y-6">
                            {generatedResume.experience?.length > 0 ? (
                                generatedResume.experience.map((exp, index)=> (
                                    <div key={index}>
                                        <h3 className="font-semibold text-lg">
                                            {exp.title}
                                        </h3>
                                        <p className="text-gray-700">
                                            {exp.description}
                                        </p> 
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No experience available.</p>
                            )}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold border-b-2 border-blue-600 pb-2">
                            PROJECTS
                        </h2>

                        <div className="mt-5 space-y-6">
                            {generatedResume.projects?.map((project, index) => (
                                <div key={index} className="border-l-4 border-blue-600 pl-4">
                                    <h3 className="font-semibold text-lg">
                                        {project.title}
                                    </h3>

                                    <p className="mt-2 text-gray-700">
                                        {project.description}
                                    </p>

                                    {project.technologies && (
                                        <p className="mt-2 text-sm text-blue-700">
                                            <strong>
                                                Technologies:
                                            </strong>
                                            {" "}
                                            {project.technologies}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold border-b-2 border-blue-600 pb-2">
                            ACHIEVEMENTS
                        </h2>

                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            {generatedResume.achievements?.map((achievement, index) => (
                                <li key={index}>
                                    {achievement}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
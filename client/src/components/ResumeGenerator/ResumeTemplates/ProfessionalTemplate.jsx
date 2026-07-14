export default function ProfessionalTemplate({
    formData,
    generatedResume,
    setGeneratedResume,
    photo,
    downloadPDF,
})
{
    const addSkill = () => {
        setGeneratedResume({
            ...generatedResume,
            skills: [
                ...(generatedResume.skills || []),
                "",
            ],
        });
    };

    const addProject = () => {
        setGeneratedResume({
            ...generatedResume,
            projects: [
                ...(generatedResume.projects || []),
                {
                    title: "",
                    description: "",
                    technologies: "",
                    impact: [],
                },
            ],
        });
    };

    const addExperience = () => {
        setGeneratedResume({
            ...generatedResume,
            experience: [
                ...(generatedResume.experience || []),
                {
                    company: "",
                    title: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                    bullets: [],
                },
            ],
        });
    };

    const deleteExperience = (index) => {
        const updated = [...generatedResume.experience];

        updated.splice(index, 1);

        setGeneratedResume({
            ...generatedResume,
            experience: updated,
        });
    };

    const deleteProject = (index) => {
        const updated= [...generatedResume.projects];

        updated.splice(index, 1);

        setGeneratedResume({
            ...generatedResume,
            projects: updated,
        });
    };


    return (
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden min-h-[1050px] border">

            <div className="bg-blue-700 text-white px-10 py-8 flex justify-between items-center">

                <div>
                    <h1 className="text-4xl font-bold tracking-wide">
                        {formData.fullName}
                    </h1>

                    <p className="text-xl mt-2 text-blue-100">
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

                        { formData.linkedin && (<p>
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

                    <div className="space-y-2 mt-4">
                        {generatedResume.skills?.map((skill, index)=> (
                            <div key={index} className="flex gap-2">
                                <input value={skill} onChange={(e) => {
                                    const updated = [...generatedResume.skills];

                                    updated[index] = e.target.value;

                                    setGeneratedResume({
                                        ...generatedResume,
                                        skills: updated,
                                    });
                                }} className="flex-1 border rounded p-2" />

                                <button type="button" onClick={()=> {
                                    const updated = [...generatedResume.skills];

                                    updated.splice(index, 1);
                                    setGeneratedResume({
                                        ...generatedResume,
                                        skills: updated,
                                    });
                                }} className="bg-red-500 text-white px-3 rounded hover:bg-red-600">
                                    x
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addSkill} className="bg-blue-600 text-white px-4 py-2 rounded">
                            + Add Skill
                        </button>
                    </div>

                </div>

                <section className="mt-8">

                    <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-2">
                        Education
                    </h2>

                    <textarea value={formData.education} rows={5} readOnly className="w-full border rounded-lg p-3 mt-4 bg-gray-50" />
                 </section>

                <div className="col-span-2 p-8 space-y-10">

                    <section>
                        <h2 className="text-xl font-bold border-b-2 border-blue-600 pb-2">
                            PROFESSIONAL SUMMARY
                        </h2>

                        <textarea value={generatedResume.summary || ""} onChange={(e) => 
                            setGeneratedResume({
                                ...generatedResume,
                                summary: e.target.value
                            })
                        } rows ={6} className="w-full mt-4 border rounded-lg p-3 leading-7 resize-none" />

                    </section>

                    <section>
                        <h2 className="text-xl font-bold border-b-2 border-blue-600 pb-2">
                            EXPERIENCE
                        </h2>

                        <div className="mt-5 space-y-6">
                            {generatedResume.experience?.length > 0 ? (
                                generatedResume.experience.map((exp, index)=> (
                                    <div key={index} className="border rounded-lg p-4 relative space-y-3">
                                        <button type="button" onClick={() => deleteExperience(index)}
                                        className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded">
                                            Delete
                                        </button>

                                        <input placeholder="Job Title" value={exp.title} onChange={(e) => {
                                            const updated=[...generatedResume.experience];

                                            updated[index].title=e.target.value;

                                            setGeneratedResume({
                                                ...generatedResume,
                                                experience:updated,
                                            });
                                        }} className="w-full border rounded p-2" />

                                        <input placeholder="Company" value={exp.company} onChange={(e) =>{
                                            const updated=[...generatedResume.experience];

                                            updated[index].company=e.target.value;

                                            setGeneratedResume({
                                                ...generatedResume,
                                                experience:updated,
                                            });
                                        }} className="w-full border rounded p-2" />

                                        <input placeholder="Location" value={exp.location} onChange={(e)=>{
                                            const updated=[...generatedResume.experience];

                                            updated[index].location=e.target.value;

                                            setGeneratedResume({
                                                ...generatedResume,
                                                experience:updated,
                                            });
                                        }} className="w-full border rounded p-2" />

                                        <div className="grid grid-cols-2 gap-3">
                                            <input type="text" placeholder="Start Date" value={exp.startDate} 
                                            onChange={(e)=>{
                                                const updated=[...generatedResume.experience];

                                                updated[index].startDate=e.target.value;

                                                setGeneratedResume({
                                                    ...generatedResume,
                                                    experience:updated,
                                                });
                                            }} className="border rounded p-2" />

                                            <input type="text" placeholder="End Date" value={exp.endDate} 
                                            onChange={(e)=> {
                                                const updated=[...generatedResume.experience];

                                                updated[index].endDate=e.target.value;

                                                setGeneratedResume({
                                                    ...generatedResume,
                                                    experience:updated,
                                                });
                                            }} className="border rounded p-2" />
                                        </div>

                                        <textarea value={exp.description} rows={5} placeholder="Job Description" onChange={(e)=> {
                                            const updated=[...generatedResume.experience];

                                            updated[index].description=e.target.value;

                                            setGeneratedResume({
                                                ...generatedResume,
                                                experience:updated,
                                            });
                                        }} className="w-full border rounded p-3" />
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No experience available.</p>
                            )}
                        </div>

                        <button type="button" onClick={addExperience} className="mt-5 bg-blue-600 text-white px-5 py-2 rounded">
                            + Add Experience
                        </button>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-2">
                            Projects
                        </h2>

                        <div className="space-y-6 mt-5">
                            {generatedResume.projects?.map((project, index) => (
                                <div key={index} className="border-l-4 border-blue-600 pl-4 relative">
                                    
                                    <button type="button" onClick={() => deleteProject(index)} className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                        Delete
                                    </button>
                                    <input value={project.title} onChange={(e) => {
                                        const updated=[...generatedResume.projects];
                                        updated[index].title=e.target.value;

                                        setGeneratedResume({
                                            ...generatedResume,
                                            projects:updated,
                                        })
                                    }} className="w-full border rounded p-2 font-bold" />

                                    <textarea value={project.description} rows={5} onChange={(e)=> {
                                        const updated=[...generatedResume.projects];
                                        updated[index].description=e.target.value;

                                        setGeneratedResume({
                                            ...generatedResume,
                                            projects:updated,
                                        });
                                    }} className="w-full border rounded-lg p-3 mt-2" />

                                    {project.technologies && (
                                        <p className="mt-2 text-sm text-blue-700">
                                            <strong>
                                                Tech Stack:
                                            </strong>
                                            {" "}
                                            {project.technologies}
                                        </p>
                                    )}

                                    {project.impact && (
                                        <ul className="list-disc pl-6 mt-2">
                                            
                                            {project.impact.map((item, i) =>(
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button type="button" onClick={addProject} className="mt-6 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
                            + Add Project
                        </button>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold border-b-2 border-blue-600 pb-2">
                            ACHIEVEMENTS
                        </h2>

                        <div className="space-y-2">
                            {generatedResume.achievements?.map((achievement, index) => (
                                <div key={index} className="flex-gap-2">
                                    <input value={achievement} onChange={(e)=>{
                                        const updated = [...generatedResume.achievements];
                                        updated[index] = e.target.value;

                                        setGeneratedResume({
                                            ...generatedResume,
                                            achievements: updated,
                                        });
                                    }} className="flex-1 border rounded p-2" />

                                    <button type="button" onClick={() => {
                                        const updated = [...generatedResume.achievements];
                                        updated.splice(index, 1);

                                        setGeneratedResume({
                                            ...generatedResume,
                                            achievement: updated,
                                        });
                                    }} className="bg-red-500 text-white px-3 rounded hover:bg-red-600">
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                        
                        <button type="button" onClick={()=> {
                            setGeneratedResume({
                                ...generatedResume,
                                achievements: [
                                    ...(generatedResume.achievements || []),
                                    "",
                                ],
                            });
                        }} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            + Add Achievement
                        </button>
                    </section>

                    <div className="mt-10">
                        <button type="button" onClick={downloadPDF} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

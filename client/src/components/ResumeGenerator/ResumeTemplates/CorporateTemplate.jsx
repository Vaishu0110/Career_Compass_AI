export default function CorporateTemplate({ resume }) {
    const skill = (resume.skills || "").split(",").filter(skill => skill.trim());
    return (
        <div className="bg-white shadow-xl max-w-5xl mx-auto border">
            
            <div clasName="border-b-4 border-blue-800 p-8">

                <h1 className="text-5xl font-bold text-gray-900">
                    {resume.fullName || "Your Name"}
                </h1>

                <p className="text-2xl text-blue-700 mt-2">
                    {resume.targetRole || "Professional"}
                </p>

                <div className="flex gap-8 mt-5 text-gray-600">

                    <span>{resume.email}</span>

                    <span>{resume.phone}</span>

                </div>

            </div>

            <div className="grid gird-cols-3">

                <div className="bg-gray-100 p-8">

                    <h2 className="font-bold text-xl mb-4">
                        Skills
                    </h2>

                    <div className="space-y-2">

                        {skill.map((skill, index) => (
                            <div key={index} className="bg-blue-700 text-white rounded px-3 py-2">
                                {skill.trim()}
                            </div>
                        ))}
                    </div>

                    <hr className="my-8" />

                    <h2 className="font-bold text-xl mb-4">
                        Education
                    </h2>

                    <p className="whitespace-pre-wrap leading-7">
                        {resume.education}
                    </p>
                </div>

                <div className="col-span-2 p-8 space-y-8">

                    <section>

                        <h2 className="text-2xl font-bold text-blue text-blue-800 border-b pb-2">
                            Professional Summary
                        </h2>

                        <p className="mt-4 whitespace-pre-wrap leading-8">
                            {resume.summary}
                        </p>

                    </section>

                    <section>

                        <h2 className="text-2xl font-bold text-blue-800 border-b pb-2">
                            Work Experience
                        </h2>

                        <p className="mt-4 whitespace-pre-wrap leading-8">
                            {resume.experience}
                        </p>

                    </section>

                    <section>

                        <h2 className="text-2xl font-bold text-blue-800 border-b-pb-2">
                            Projects
                        </h2>

                        <p className="mt-4 whitespace-pre-wrap leading-8">
                            {resume.projects}
                        </p>
                        
                    </section>
                </div>
            </div>
        </div>
    );
}
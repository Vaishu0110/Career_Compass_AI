export default function DeveloperTemplates({ resume })
{
    return (
        <div className="bg-white p-8 shadow rounded">
            <div className="border-b pb-4 mb-4">
                <h1 className="text-4xl font-bold">{resume.fullName}</h1>
                <p>{resume.email}</p>
                <p>{resume.phone}</p>
            </div>
            <div className="whitespace-pre-wrap">{resume.content}</div>
        </div>
    );
}
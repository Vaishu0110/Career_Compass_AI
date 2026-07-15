import ProfessionalTemplate from "./ResumeTemplate/ProfessionalTemplate";
import ModernTemplate from "./ResumeTemplates/ModernTemplate";
import CorporateTemplate from "./ResumeTemplates/CorporateTemplate";
import DeveloperTemplate from "./ResumeTemplates/DeveloperTemplate";
import StudentTemplate from "./ResumeTemplates/StudentTemplate";
import ExecutiveTemplate from "./ResumeTemplates/ExecutiveTemplate";

export default function ResumeViewer({
    resume,
    downloadPDF,
}) {
    const props = {
        formData: {
            fullName: resume.fullName,
            targetRole: resume.targetRole,
            template: resume.template,
            email: "",
            phone: "",
            linkedin: resume.resume.linkedin,
            github: resume.resume.github,
            portfolio: resume.resume.portfolio,
            education: "",
        },
        generatedResume: resume.resume,
        setGeneratedResume : () => {},
        photo: null,
        downloadPDF: () => {},
    };

    switch (resume.template) {

        case "Modern":
            return <ModernTemplate {...props} />;

        case "Corporate":
            return <CorporateTemplate {...props} />;

        case "Developer":
            return <DeveloperTemplate {...props} />;

        case "Student":
            return <StudentTemplate {...props} />;

        case "Executive":
            return <ExecutiveTemplate {...props} />;

        default:
            return <ProfessionalTemplate {...props} />;
    }
}
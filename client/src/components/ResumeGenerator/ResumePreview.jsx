import ProfessionalTemplate from "./ResumeTemplates/ProfessionalTemplate";
import ModernTemplate from "./ResumeTemplates/ModernTemplate";
import CorporateTemplate from "./ResumeTemplates/CorporateTemplate";
import DeveloperTemplate from "./ResumeTemplates/DeveloperTemplate";
import StudentTemplate from "./ResumeTemplates/StudentTemplate";
import ExecutiveTemplate from "./ResumeTemplates/ExecutiveTemplate";

export default function ResumePreview({
    formData,
    generatedResume,
    setGeneratedResume,
    photo,
    downloadPDF,
    saveResume,
}) {
    if(!generatedResume) {
        return (
            <div className="flex items-center justify-center h-full text-teal-800">
                Your AI generated resume will appear here.
            </div>
        );
    }

    const templateProps = {
        formData,
        generatedResume,
        setGeneratedResume,
        photo,
        downloadPDF,
        saveResume,
    };

    switch(formData.template) {
        
        case "Modern":
            return(
                <ModernTemplate {...templateProps} />
            );

        case "Corporate":
            return(
                <CorporateTemplate {...templateProps} />
            );

        case "Developer":
            return(
                <DeveloperTemplate {...templateProps} />
            );

        case "Student":
            return(
                <StudentTemplate {...templateProps} />
            );

        case "Executive":
            return(
                <ExecutiveTemplate {...templateProps} />
            );

        default:
            return(
                <ProfessionalTemplate {...templateProps} />
            );

    }

}
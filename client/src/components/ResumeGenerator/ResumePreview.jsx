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
}) {
    if(!generatedResume) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500">
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
    };

    switch(formData.template) {
        
        case "Modern":
            return(
                <div id="resume-preview">
                    <ModernTemplate {...templateProps} />
                </div>
            );

        case "Corporate":
            return(
                <div id="resume-preview">
                    <CorporateTemplate {...templateProps} />
                </div>
            );

        case "Developer":
            return(
                <div id="resume-preview">
                    <DeveloperTemplate {...templateProps} />
                </div>
            );

        case "Student":
            return(
                <div id="resume-preview">
                    <StudentTemplate {...templateProps} />
                </div>
            );

        case "Executive":
            return(
                <div id="resume-preview">
                    <ExecutiveTemplate {...templateProps} />
                </div>
            );

        default:
            return(
                <div id="resume-preview">
                    <ProfessionalTemplate {...templateProps} />
                </div>
            );

    }

}
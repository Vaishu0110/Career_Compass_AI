import ProfessionalTemplate from "./ResumeTemplates/ProfessionalTemplate";
import ModernTemplate from "./ResumeTemplates/ModernTemplate";
import CorporateTemplate from "./ResumeTemplates/CorporateTemplate";
import DeveloperTemplate from "./ResumeTemplates/DeveloperTemplate";
import StudentTemplate from "./ResumeTemplates/StudentTemplate";
import ExecutiveTemplate from "./ResumeTemplates/ExecutiveTemplate";

export default function ResumeViewer({ resume }) {

    if(!resume){
        return null;
    }

    const resumeData = resume.resume || {};

    const finalResume = {
        ...resume,
        ...resumeData,
        fullName: resumeData.fullName || resume.fullName || "",
        targetRole: resumeData.targetRole || resume.targetRole || "",
        skills: resumeData.skills || resume.skills || "",
        experience: resumeData.experience || resume.experience || "",
        projects: resumeData.projects || resume.projects || "",
        education: resumeData.education || resume.education || "",
        summary: resumeData.summary || resume.summary || "",
        email: resumeData.email || resume.email || "",
        phone: resumeData.phone || resume.phone || "",
        linkedin: resumeData.linkedin || resume.linkedin || "",
        github: resumeData.github || resume.github || "",
        portfolio: resumeData.portfolio || resume.portfolio || "",
    };

    const template = (resume.template || resumeData.template || "Developer").toLowerCase();

    const templateProps = {resume: finalResume, formData: finalResume, generated: finalResume, };
    
    switch (resume.template) {

        case "Modern":
            return <ModernTemplate {...templateProps} />;

        case "Corporate":
            return <CorporateTemplate {...templateProps} />;

        case "Developer":
            return <DeveloperTemplate {...templateProps} />;

        case "Student":
            return <StudentTemplate {...templateProps} />;

        case "Executive":
            return <ExecutiveTemplate {...templateProps} />;

        default:
            return <ProfessionalTemplate {...templateProps} />;
    }
}
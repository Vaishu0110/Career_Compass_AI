import ProfessionalTemplate from "./ProfessionalTemplate";

export default function ModernTemplate(props) {
    return (
        <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-100 p-8 rounded-xl">
            <ProfessionalTemplate {...props} />
        </div>
    );
}
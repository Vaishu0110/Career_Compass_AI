import ProfessionalTemplate from "./ProfessionalTemplate";

export default function CorporateTemplate(props) {
    return (
        <div className="bg-white border-4 border-gray-800 rounded-lg">
            <ProfessionalTemplate {...props} />
        </div>
    );
}
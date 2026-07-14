import ProfessionalTemplate from "./ProfessionalTemplate";

export default function DeveloperTemplate(props) {
    return (
        <div className="bg-gray-900 text-green-400 p-6 rounded-lg">
            <ProfessionalTemplate {...props} />
        </div>
    );
}
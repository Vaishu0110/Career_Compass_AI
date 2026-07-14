import ProfessionalTemplate from "./ProfessionalTemplate";

export default function ExecutiveTemplate(props) {
    return (
        <div className="bg-gray-100 border-t-8 border-black shadow-xl">
            <ProfessionalTemplate {...props} />
        </div>
    );
}
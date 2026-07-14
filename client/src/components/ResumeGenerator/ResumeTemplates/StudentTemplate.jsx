import ProfessionalTemplate from "./ProfessionalTemplate";

export default function StudentTemplate(props) {
    return(
        <div className="bg-yellow-50 border-l-8 border-yellow-500 p-6">
            <ProfessionalTemplate {...props} />
        </div>
    );
}
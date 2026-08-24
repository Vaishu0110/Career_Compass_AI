export default function TemplateCard({
    title,
    image,
    selected,
    onClick,
}) {
    return (
        <div onClick={onClick} className={`cursor-pointer rounded-xl overflow-hidden border-4 transition-all duration-300
            ${ selected ? "border-4 border-blue-600 shadow-xl scale-105" : "border hover:shadow-lg hover:scale-105" }
            `}>
                <img src={image} alt={title} className="h-48 w-full object-cover" />
                <div className={`text-center py-3 font-semibold${
                    selected ? "bg-blue-600 text-white" : "bg-white"
                }`}>
                    {title}
                </div>
        </div>
    );
}
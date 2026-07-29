export default function TemplateCard({
    title,
    image,
    selected,
    onClick,
}) {
    return (
        <div onClick={onClick} className={`cursor-pointer rounded-xl overflow-hidden border-4 transition-all duration-300
            ${ selected ? "border-blue-600 shadow-xl scale-105" : "border-gray-200 hover:border-blue-300 hover:shadow-lg" }
            `}>
                <img src={image} alt={title} className="h-48 w-full object-cover" />
                <div className="p-4 bg-white">

                    <h3 className="font-bold text-lg">
                        {title}
                    </h3>
                </div>
        </div>
    );
}
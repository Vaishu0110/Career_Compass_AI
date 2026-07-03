export default function Achievements() {
    const badges = [
        "🏅 Resume Master",
        "🎯 ATS Expert",
        "💼 Job Hunter",
        "🚀 Interview Ready",
    ];

    return (
        <div className="'bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
                Achievements
            </h2>
            <div className="flex flex-wrap gap-4">
                {badges.map((badge) => (
                    <div key={badge} className="bg-yellow-200 px-4 py-2 rounded-full">
                        {badge}
                    </div>
                ))}
            </div>
        </div>
    );
}
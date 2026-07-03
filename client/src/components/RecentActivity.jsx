export default function RecentActivity() {
    const activities = [
        "Resume analyzed",
        "ATS score updated",
        "Skill gap analyzed",
        "Interview completed",
        "Applied for a new job",
    ];
    
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
                Recent Activity
            </h2>
            <ul className="space-y-3">
                {activities.map((item, index) => (
                    <li key={index}>
                        ✅ {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}
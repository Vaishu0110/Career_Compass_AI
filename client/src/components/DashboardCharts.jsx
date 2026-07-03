import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";

import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

export default function DashboardCharts ({ stats }) {
    const jobData = {
        labels:[
            "Applied",
            "Interview",
            "Offer",
            "Rejected",
        ],

        datasets: [
            {
                data: [
                    stats.applied,
                    stats.interview,
                    stats.offer,
                    stats.rejected,
                ],
                backgroundColor: [
                    "#3B82F6",
                    "#EAB308",
                    "#22C55E",
                    "#EF4444",
                ],
            },
        ],
    };

    const scoreData = {
        labels: [
            "Resume",
            "ATS",
        ],

        datasets: [
            {
                label: "Scores",
                data: [
                    stats.resumeScore,
                    stats.atsScore,
                ],
                backgroundColor: [
                    "#2563EB",
                    "#16A34A",
                ],
            },
        ],
    };

    return (
        <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold mb-4">
                    Job Applications
                </h2>
                <Doughnut data={jobData} />
            </div>
            
            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold mb-4">
                    Resume vs ATS
                </h2>

                <Bar data = { scoreData } />
            </div>
        </div>
    );
}
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
                    "#94700d",
                    "#00bfff",
                    "#00704b",
                    "#860200",
                ],
                borderWidth: 3,
                borderColor: "#ffffff",
                hoverOffset: 6,
            },
        ],
    };

    const scoreData = {
        labels: [
            "Resume Score", "ATS Match", "Interview", "Roadmap%"],
        datasets: [
            {
                label: "Performance Rating",
                data: [
                    stats?.resumeScore || 0,
                    stats?.atsScore || 0,
                    stats?.interviewScore || 0,
                    stats?.learningProgress || 0,
                ],
                backgroundColor: [
                    "rgb(232, 156, 205)",
                    "rgb(176, 219, 199)",
                    "#00bfff",
                    "rgb(227, 228, 162)",
                ],
                borderRadius: 8,
                borderSkipped: false,
                barThickness: 32,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false, },
            tooltip: {
                backgroundColor: "#0f172a",
                titleColor: "#f8fafc",
                bodyColor: "#f8fafc",
                cornerRadius: 10,
                padding: 12,
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: "#fafafa", font: { weight: "600", size: 12 } },
            },
            y: {
                beginAtZero: true,
                max:100,
                grid: { color: "#e2e8f0", strokeDash: [4, 4] },
                ticks: { color: "#f5f7fa", font: { size: 12 } },
            },
        },
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "75%",
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                    padding: 40,
                    color: "#f3f8f8",
                    font: { weight: "600", size: 12 },
                },
            },
            tooltip: {
                backgroundColor: "#0f172a",
                titleColor: "#f8fafc",
                bodyColor: "#f8fafc",
                cornerRadius: 10,
                padding: 12,
            },
        },
    };

    return (
        <div className="grid md:grid-cols-2 gap-8 ">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-md border border-teal-100 dark:border-teal-900 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-4">    
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                        Application Pipeline Distribution
                    </h3>
                    <span className="text-xs bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 font-bold px-2.5 py-1 rounded-full">
                        Funnel
                    </span>
                </div>
                <div className="h-[260px] relative flex items-center justify-center">
                    <Doughnut data={jobData} options={doughnutOptions} />
                </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-md border border-teal-100 dark:border-teal-900 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        Overall Career Readiness Metrics
                    </h3>

                    <span className="text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold px-2.5 py-1 rounded-full">
                        Ratings
                    </span>
                </div>

                <div className="h-[260px]">
                    <Bar data = { scoreData } options={barOptions}/>
                </div>
            </div>
        </div>
    );
}
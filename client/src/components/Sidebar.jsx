export default function Sidebar(){
    return (
        <aside className="w-64 bg-gray-800 text-white h-screen p-4"> 
        <ul className="space-y-4">
            <li>Dashboard</li>
            <li>  <a href="/resume-analyzer">    Resume Analyzer  </a> </li>
            <li>ATS Score</li>
            <li>Skill Gap Analysis</li>
            <li>Learning Roadmap</li>
            <li>Interview Simulator</li>
            <li>Job Tracker</li>
        </ul>
        </aside>
    );
}
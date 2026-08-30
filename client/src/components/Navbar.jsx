// client/src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
    const { user } = useContext(AuthContext);
    const [ showServices, setShowServices] = useState(false);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    const navLinks = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Resume Analyzer", path: "/resume-analyzer" },
        { name: "ATS Checker", path: "/ats-checker" },
        { name: "Skill Gap", path: "/skill-gap" },
        { name: "Roadmap", path: "/learning-roadmap" },
        { name: "Interview", path: "/interview-simulator" },
        { name: "Jobs", path: "/job-tracker" },
        { name: "AI Coach", path: "/career-coach" },
    ];

    return (
        <header className="sticky top-0 z-50 bg-teal-900/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-teal-700/40 shadow-xl transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
                
                <Link to="/dashboard" className="flex items-center gap-2.5 group">
                    
                    <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-teal-100 via-emerald-200 to-teal-50 bg-clip-text text-transparent tracking-tight">
                        Career Compass AI
                    </span>
                </Link>

                <nav className="hidden lg:flex items-center gap-2 text-xs xl:text-sm font-medium text-teal-100">

                    <NavLink to="/dashboard" className={({isActive}) => `px-3 py-2 rounded-xl transition duration-150 ${isActive ? "bg-teal-700/80 text-emerald-300 font-bold border border-teal-500/50 shadow-inner" : "hover:bg-teal-800/60 hover:text-emerald-200"}` }>
                        Dashboard
                    </NavLink>

                    <div className="relative">
                        <button onClick={() => setShowServices(!showServices)} className="px-3 py-2 rounded-xl hover:bg-teal-800/60 hover:text-emerald-200 transition duration-150">
                            Services
                        </button>

                        {showServices && (
                            <div className="absolute top-full left-0 mt-2 w-56 bg-teal-950 border border-teal-700/50 rounded-xl shadow-2xl overflow-hidden">
                                {services.map((service) => (
                                    <Link key={service.path} to={service.path} onClick={() => setShowServices(false)} className="block px-4 py-3 text-sm text-teal-100 hover:bg-teal-800/70 hover:text-emerald-300 transition">
                                        {service.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}
// client/src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
    const { user } = useContext(AuthContext);

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
                
                {/* BRAND LOGO */}
                <Link to="/dashboard" className="flex items-center gap-2.5 group">
                    
                    <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-teal-100 via-emerald-200 to-teal-50 bg-clip-text text-transparent tracking-tight">
                        Career Compass AI
                    </span>
                </Link>

                {/* DYNAMIC NAV LINK WITH INSTANT ACTIVE HIGHLIGHTING */}
                <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-medium text-teal-100">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-xl transition duration-150 ${
                                    isActive
                                        ? "bg-teal-700/80 text-emerald-300 font-bold border border-teal-500/50 shadow-inner"
                                        : "hover:bg-teal-800/60 hover:text-emerald-200"
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>

                {/* RIGHT ACTIONS */}
                <div className="flex items-center gap-3">

                    {user && (
                        <div className="hidden sm:flex items-center gap-2.5 pl-2 border-l border-teal-700/50">
                            <img
                                src={
                                    user?.profilePicture
                                        ? `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5000'}/uploads/profile/${user.profilePicture}`
                                        : "/default-avatar.png"
                                }
                                alt="Profile"
                                className="w-9 h-9 rounded-full object-cover border-2 border-emerald-400 shadow"
                            />
                            <span className="text-xs font-semibold text-teal-100 max-w-[100px] truncate">
                                {user.name}
                            </span>
                        </div>
                    )}

                    <button
                        onClick={logout}
                        className="bg-red-500/90 hover:bg-red-600 text-white px-3.5 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow hover:shadow-lg active:scale-95"
                    >
                        Logout
                    </button>
                </div>

            </div>
        </header>
    );
}
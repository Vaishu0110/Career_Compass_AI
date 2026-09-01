// client/src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { useContext} from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
    const { user } = useContext(AuthContext);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    const services = [
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

                    <NavLink to="/dashboard" className={({isActive}) => `px-3 py-2 rounded-xl transition duration-150 ${isActive ? "bg-teal-700/80 text-teal-100 font-bold border border-teal-500/50 shadow-inner" : "text-teal-100 hover:bg-teal-800/60"}` }>
                        Dashboard
                    </NavLink>

                    <div className="relative group">
                        <button className="px-3 py-2 rounded-xl hover:bg-teal-800/60 hover:text-emerald-200 transition duration-150">
                            Services
                        </button>

                        <div className="absolute left-0 top-full pt-2 w-56 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150">
                            <div className="bg-teal-950 border border-teal-700/50 rounded-xl shadow-2xl overflow-hidden">
                                {services.map((service) => (
                                    <Link
                                        key={service.path}
                                        to={service.path}
                                        className="block px-4 py-3 text-sm text-teal-100 hover:bg-teal-800/70 hover:text-emerald-300 transition"
                                    >
                                        {service.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="flex items-center">

                    {user && (
                        <div className="relative group">
                            <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-teal-800/60 transition cursor-pointer">
                                <img
                                    src={user?.profilePicture || "/default-avatar.png"}
                                    alt="Profile"
                                    className="w-9 h-9 rounded-full object-cover border-2 border-emerald-400 shadow"
                                />
                                <span className="hidden sm:block text-xs font-semibold text-teal-100 max-w-[100px] truncate">
                                    {user.name}
                                </span>
                            </div>
                    
                            <div className="absolute right-0 top-full pt-2 w-48 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150">
                                <div className="bg-teal-950 border border-teal-700/50 rounded-xl shadow-2xl overflow-hidden">
                                    <Link to="/edit-profile" className="block px-4 py-3 text-sm text-teal-100 hover:bg-teal-800/70 hover:text-emerald-300 transition">
                                        Edit Profile
                                    </Link>
                                    <button onClick={logout} className="cursor-pointer w-full text-left px-4 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                        )}
                </div>
            </div>
        </header>
    );
}
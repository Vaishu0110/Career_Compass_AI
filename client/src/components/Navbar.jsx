import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useContext } from "react"
import  { AuthContext } from "../context/AuthContext";

export default function Navbar(){
    const { user } = useContext(AuthContext);
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };
    return(
        <nav className="bg-gray-900 dark:bg-gray-950 text-white p-4 flex justify-between items-center shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
                <h1 className="text-2xl font-bold">
                    Career Compass AI
                </h1>
                <div className="flex items-center gap-5 text-sm font-medium">
                    <Link to="/" className="hover:text-blue-400 transition">
                        Dashboard
                    </Link>
                    <Link to="/resume-analyzer" className="hover:text-blue-400 transition">
                        Resume 
                    </Link>
                    <Link to="/ats-checker" className="hover:text-blue-400 transition">
                        ATS
                    </Link>
                    <Link to="/skill-gap" className="hover:text-blue-400 transition">
                        Skill Gap
                    </Link>
                    <Link to="/learning-roadmap" className="hover:text-blue-400 transition">
                        Roadmap
                    </Link>
                    <Link to="/interview-simulator" className="hover:text-blue-400 transition">
                        Interview
                    </Link>
                    <Link to="/job-tracker" className="hover:text-blue-400 transition">
                        Jobs
                    </Link>
                    <Link to="/career-coach" className="hover:text-blue-400 transition">
                        AI Coach
                    </Link>
                    <ThemeToggle />
                    {user && (
                        <div className="flex items-center gap-2 text-white">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <span>
                                {user.name}
                            </span>
                        </div>
                    )}
                    <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-4py-2 rounded-lg transition">
                        LOGOUT
                    </button>
                </div>
            </div>
        </nav>
    );
}
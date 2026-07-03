import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
    const {darkMode, toggleTheme } = useTheme();

    return(
        <button onClick={toggleTheme} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
    );
}
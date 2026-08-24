import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function AppLayout(){
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
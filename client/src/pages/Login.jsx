import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem("user",JSON.stringify(res.data.user));

      setUser(res.data.user);

      alert("Login Successful");
      if(!res.data.user.profileCompleted)
      {
        navigate("/profile-setup")
      } else {
        navigate("/dashboard")
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6 relative overflow-hidden">
            
            {/* AMBIENT BACKGROUND GLOW */}
            <div className="absolute w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -top-20 -left-20 pointer-events-none" />
            <div className="absolute w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -bottom-20 -right-20 pointer-events-none" />
            {/* AUTH CARD */}
            <div className="bg-slate-900/90 border border-teal-500/30 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-xl w-full max-w-md space-y-8 relative z-10">
                
                {/* BRAND HEADER */}
                <div className="text-center space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white font-black text-2xl shadow-lg mx-auto">
                        🧭
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-teal-100 via-emerald-200 to-teal-50 bg-clip-text text-transparent">
                        Career Compass AI
                    </h1>
                    <p className="text-xs text-gray-400 font-medium">
                        Welcome back! Sign in to access your dashboard.
                    </p>
                </div>
                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-slate-950 border border-teal-800/80 rounded-2xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                            Password *
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-slate-950 border border-teal-800/80 rounded-2xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold py-4 rounded-2xl shadow-lg hover:shadow-xl transition transform active:scale-95 text-base mt-2"
                    >
                        Sign In to Career Compass
                    </button>
                </form>
                {/* FOOTER */}
                <div className="text-center pt-2 border-t border-slate-800">
                    <p className="text-xs text-gray-400">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-emerald-400 font-bold hover:underline">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
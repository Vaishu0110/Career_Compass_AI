 import { useState } from "react";
 import axiosInstance from "../api/axiosInstance";
 import { useNavigate } from "react-router-dom";

 export default function Signup(){
    const navigate = useNavigate();
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
    });

    const handleChange =(e)=> {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };
    const handleSubmit =async (e)=>{e.preventDefault()
        try{
            await axiosInstance.post(
                "/auth/register",
                formData
            );
            alert("Registration Successful");
            navigate("/login")
        } catch (error) {
            alert(error.response?.data?.message || "Registration Failed");
        }
    };
    return(<div className="h-screen flex items-center justify-center bg-gray-900">
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg w-96">
            <h1 className="text-3xl text-white mb-6 text-center">Sign Up</h1>
            <input type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded"
            required />
            <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded"
            required />
            <input 
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded"
            required />
            <button type="submit" className="w-full bg-green-600 text-white p-3 rounded">
            Sign Up
            </button>
        </form>
    </div>
    );
 }

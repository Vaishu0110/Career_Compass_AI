import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
export const AuthContext = createContext();

export const AuthProvider = ({children})=> {
    const [user ,setUser]= useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
        const token = localStorage.getItem("token");

        if(!token) {
            setLoading(false);
            return;
        }
        try{
            const res=await axiosInstance.get("/auth/me",{
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            setUser(res.data);
        } catch (error) {
            console.error(error);
            localStorage.removeItem("token");
        } finally {
            setLoading(false);
        }
    };

    loadUser();
    },[]);

    return(
        <AuthContext.Provider value={{user, setUser, loading}}>
            {children}
        </AuthContext.Provider>
    );
};
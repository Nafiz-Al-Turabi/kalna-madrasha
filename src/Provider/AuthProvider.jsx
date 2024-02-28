import React, { createContext,useContext,useEffect,useState } from 'react';
import app from '../firebase/firebase.config';
import axiosInstance from '../Global/Axios/AxiosInstance';

export const AuthContext = createContext()
export const useAuth = () => {
    return useContext(AuthContext);
};


const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Token exists, so the user is logged in
            setIsLoggedIn(true);
        }
        setLoading(false); // Mark loading as false after initial check
    }, []);

    const login = async (email, password) => {
        setLoading(true); // Set loading to true during login process
        try {
            const response = await axiosInstance.post('/login', { email, password });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
        setLoading(false); // Set loading back to false after login process
    };

    const logout = () => {
        setLoading(true);
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        setLoading(false);
        
    };
    
    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout,loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
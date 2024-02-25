import React, { createContext,useContext,useEffect,useState } from 'react';
import app from '../firebase/firebase.config';
import axiosInstance from '../Global/Axios/AxiosInstance';

export const AuthContext = createContext()
export const useAuth = () => {
    return useContext(AuthContext);
};


const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Token exists, so the user is logged in
            setIsLoggedIn(true);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axiosInstance.post('/login', { email, password });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        
    };
    
    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
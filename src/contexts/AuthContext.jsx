import { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin } from '../lib/api';


const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        setIsAuthenticated(!!token);
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const response = await loginAdmin({ username, password });
            if (response.status === 200) {
                const token = response.data?.token || 'admin123';
                localStorage.setItem('adminToken', token);
                setIsAuthenticated(true);
            }
        } catch (error) {
            if (error.response?.status === 401) {
                throw new Error('Invalid credentials');
            }
            throw new Error('Login failed. Please try again.');
        }
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
    };

    const value = {
        isAuthenticated,
        login,
        logout,
        loading
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};

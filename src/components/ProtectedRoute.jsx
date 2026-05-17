import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen bg-gray-50">Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/admin-login" replace />;
}

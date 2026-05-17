import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
    const { logout } = useAuth();

    const navLinkClass = ({ isActive }) => 
        `pb-2 font-medium transition-colors ${isActive ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500 hover:text-gray-900'}`;

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <Button onClick={logout} variant="destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                </Button>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex border-b mb-6 gap-6">
                <NavLink to="products" className={navLinkClass}>
                    Product Creation
                </NavLink>
                <NavLink to="inquiries" className={navLinkClass}>
                    Inquiry / Queries
                </NavLink>
                <NavLink to="checkout" className={navLinkClass}>
                    Cart / Checkout
                </NavLink>
            </div>

            {/* Injects the nested Route components (ProductTab, InquiryTab, CheckoutTab) */}
            <div className="bg-white rounded-lg">
                <Outlet />
            </div>
        </div>
    );
}

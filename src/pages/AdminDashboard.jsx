import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Package, Mail, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
    const { logout } = useAuth();

    const navLinkClass = ({ isActive }) => 
        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
            isActive 
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`;

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Top Navigation Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-white font-black shadow-md shadow-orange-500/25">
                            TE
                        </div>
                        <div>
                            <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-none mb-1">
                                Trimurti Admin
                            </h1>
                            <p className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase">Management Panel</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs text-gray-600 font-semibold">
                            <User className="w-3.5 h-3.5 text-gray-400" />
                            <span>Administrator</span>
                        </div>
                        <Button onClick={logout} variant="ghost" className="text-gray-500 hover:text-red-600 hover:bg-red-50 gap-2 font-semibold">
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Dashboard Container */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-1 lg:sticky lg:top-24">
                            <div className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                                Core Menu
                            </div>
                            <NavLink to="products" className={navLinkClass}>
                                <Package className="w-4 h-4" />
                                <span>Product Creation</span>
                            </NavLink>
                            <NavLink to="inquiries" className={navLinkClass}>
                                <Mail className="w-4 h-4" />
                                <span>Inquiry / Queries</span>
                            </NavLink>
                            <NavLink to="checkout" className={navLinkClass}>
                                <ShoppingCart className="w-4 h-4" />
                                <span>Cart / Checkout</span>
                            </NavLink>
                        </div>
                    </div>

                    {/* Right Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm min-h-[500px]">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Phone, Mail, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';

const NAV_ITEMS = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

const CONTACT_NUMBER = "+91 98601 33235";
const EMAIL = "trimurtienterprisesphaltan@gmail.com";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { cart } = useCart();
    
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b border-border">

            {/* ✅ 3 Section Layout */}
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* LEFT: Logo */}
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src="/products/logo.png"
                        alt="Premier Plastics Logo"
                        className="h-12 w-auto object-contain"
                    />
                </Link>

                {/* CENTER: Nav Items */}
                <div className="hidden md:flex flex-1 justify-end items-center pr-16">
                    <div className="flex items-center justify-between w-full max-w-sm">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className="text-foreground hover:text-primary transition-colors font-medium text-center flex-1"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Contact (Desktop) + Mobile Controls */}
                <div className="flex items-center gap-4">

                    <Link to="/checkout" className="relative p-2 hover:bg-muted rounded-lg transition mr-2 md:mr-0">
                        <ShoppingCart className="w-5 h-5 text-gray-700" />
                        {cartItemCount > 0 && (
                            <span className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>

                    {/* Desktop Contact */}
                    <div className="hidden md:flex items-center gap-6 text-sm border-l pl-6">
                        <a
                            href={`tel:${CONTACT_NUMBER}`}
                            className="flex items-center gap-2 hover:text-primary transition-colors"
                        >
                            <Phone className="w-4 h-4" />
                            {CONTACT_NUMBER}
                        </a>

                        <a
                            href={`mailto:${EMAIL}`}
                            className="flex items-center gap-2 hover:text-primary transition-colors"
                        >
                            <Mail className="w-4 h-4" />
                            {EMAIL}
                        </a>
                    </div>

                    {/* Mobile Contact Box */}
                    <div className="md:hidden flex flex-col items-start gap-1 bg-muted/50 rounded-md p-2 border border-orange-500 shadow-sm">
                        <a
                            href={`tel:${CONTACT_NUMBER}`}
                            className="text-xs flex items-center gap-1"
                        >
                            <Phone className="w-3 h-3" />
                            {CONTACT_NUMBER}
                        </a>
                        <a
                            href={`mailto:${EMAIL}`}
                            className="text-xs flex items-center gap-1"
                        >
                            <Mail className="w-3 h-3" />
                            {EMAIL}
                        </a>
                    </div>

                    {/* Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 hover:bg-muted rounded-lg transition"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </nav>

            {/* 🔥 Mobile Menu with SAME Animation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-16 right-0 h-[calc(100vh-64px)] w-1/2 bg-background border-l border-red-500 border-[1px] rounded-l-2xl md:hidden z-50 overflow-hidden flex flex-col"
                    >
                        {/* Main Content */}
                        <div className="flex flex-col gap-4 p-4 flex-1">

                            {/* Nav Items */}
                            {NAV_ITEMS.map((item) => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 rounded-lg hover:bg-primary/20"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="text-center text-xs text-gray-500 py-3 border-t border-gray-200">
                            © 2026 Trimurti Enterprises. All rights reserved.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
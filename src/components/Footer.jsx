import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-300 border-t border-gray-200 pt-16 pb-10 px-4 sm:px-6 lg:px-8 shadow-sm">
            <div className="max-w-7xl mx-auto">

                {/* 4 Equal Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 text-center md:text-left">

                    {/* Premium Plastic (Brand) */}
                    <div className="space-y-4 tracking-widest">
                        <h1 className="flex flex-col leading-tight">
                            <span className="text-2xl md:text-3xl font-extrabold text-orange-500 tracking-wide">
                                TRIMURTI
                            </span>
                            <span className="text-sm md:text-base font-medium text-orange-500 tracking-wider">
                                ENTERPRISES
                            </span>
                        </h1>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            We manufacture high-quality plastic bottles with precision,
                            durability, and eco-friendly solutions for modern industries.
                        </p>
                    </div>

                    {/* Services */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                            Services
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>Custom Bottle Design</li>
                            <li>Bulk Manufacturing</li>
                            <li>Packaging Solutions</li>
                            <li>Quality Testing</li>
                        </ul>

                    </div>

                    {/* Company */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                            Company
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="text-gray-600 hover:text-orange-500 transition">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-gray-600 hover:text-orange-500 transition">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-600 hover:text-orange-500 transition">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-600 hover:text-orange-500 transition">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact (Fully Working) */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                            Contact
                        </h3>

                        <ul className="space-y-3 text-sm">

                            {/* Phone */}
                            <li>
                                <a
                                    href="tel:+919860133235"
                                    className="flex items-center justify-center md:justify-start gap-2 text-gray-600 hover:text-orange-500 transition"
                                >
                                    <Phone className="w-4 h-4" />
                                    +91 98601 33235
                                </a>
                            </li>

                            {/* Email */}
                            <li>
                                <a
                                    href="mailto:trimurtienterprisesphaltan@gmail.com"
                                    className="flex items-center justify-center md:justify-start gap-2 text-gray-600 hover:text-green-500 transition"
                                >
                                    <Mail className="w-4 h-4" />
                                    trimurtienterprisesphaltan@gmail.com
                                </a>
                            </li>

                            {/* Location */}
                            <li>
                                <a
                                    href="https://maps.app.goo.gl/hWLyoHswz2oLnKWG9"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center md:justify-start gap-2 text-gray-600 hover:text-blue-500 transition"
                                >
                                    <MapPin className="w-4 h-4" />
                                    Trimurti Enterprises, Phaltan
                                </a>
                            </li>

                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500 text-center md:text-left">
                    <p>
                        &copy; {currentYear}{' '}
                        <Link to="/admin-login" className="cursor-default text-gray-500 hover:text-gray-500">
                            Trimurti Enterprises
                        </Link>
                        . All rights reserved.
                    </p>

                    <div className="flex gap-5">
                        <Link to="/privacy" className="hover:text-orange-500 transition">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="hover:text-green-500 transition">
                            Terms of Service
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}

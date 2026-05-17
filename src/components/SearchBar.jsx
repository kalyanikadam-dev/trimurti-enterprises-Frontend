import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";

export function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentImage, setCurrentImage] = useState(0);

    const images = [
        "/products/bottle1.jpeg",
        "/products/bottle2.jpeg",
        "/products/bottle3.jpeg",
        "/products/bottle4.jpeg",
        "/products/bottle5.jpeg"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * images.length);
            setCurrentImage(randomIndex);
        }, 3000); // 3 seconds

        return () => clearInterval(interval);
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        // TODO: Integrate with products page or filter
        if (e.target.value) {
            window.location.href = `/products?search=${encodeURIComponent(e.target.value)}`;
        }
    };

    return (
        <section>

            {/* 🔥 SEAMLESS INFINITE MARQUEE */}
            <div className="relative overflow-hidden bg-gray-50 py-3 border-y border-gray-200">

                {/* Fade edges */}
                <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-gray-50 to-transparent z-10" />
                <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-gray-50 to-transparent z-10" />

                {/* Track */}
                <div className="flex animate-marquee w-max">

                    {/* REPEAT TEXT MULTIPLE TIMES */}
                    {[...Array(6)].map((_, i) => (
                        <p
                            key={i}
                            className="mx-8 text-sm sm:text-base font-semibold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-green-500"
                        >
                            All types HDPE bottles manufacturers and suppliers • Injection molding • Blow molding
                        </p>
                    ))}

                </div>
            </div>

            {/* 🔥 ROTATING IMAGES */}
            <div className="mt-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">

                    <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-red-200 via-orange-200 to-red-200">
                        <img
                            src={images[currentImage]}
                            alt="Plastic Bottle Product"
                            className="
            w-full 
            h-[220px] sm:h-[320px] md:h-[420px] lg:h-[500px]
            object-cover 
            rounded-2xl 
            bg-white
            shadow-md hover:shadow-xl
            transition-all duration-500
          "
                        />
                    </div>

                </div>
            </div>




            {/* 🔥 SECTION DIVIDER + TITLE */}
            <div className="mt-16 mb-6 flex justify-center">
                <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-orange-300 to-transparent" />
            </div>

            <div className="text-center mb-10 px-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    Our Manufacturing Process
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                    High-quality production with modern technology
                </p>
            </div>

            {/* 🔥 VIDEO + TEXT SECTION (WITH BACKGROUND) */}
            <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* LEFT TEXT */}
                    <div className="space-y-6 text-center md:text-left">

                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-snug text-gray-900 whitespace-nowrap">
                            Plastic Bottle{" "}
                            <span className="bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text text-transparent">
                                Manufacturer
                            </span>
                        </h1>

                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
                            We manufacture high-quality, durable and eco-friendly plastic bottles designed for modern packaging needs.
                            Our products are widely used in cosmetics, beverages, pharmaceutical and industrial industries.
                        </p>

                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
                            Using advanced manufacturing technology, every bottle is produced with strict quality standards and tested
                            for durability, weight and leakage.
                        </p>

                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
                            We also provide custom bottle sizes, shapes and colors to help brands create unique packaging while promoting
                            environmentally responsible solutions.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">

                            {/* View Products */}
                            <motion.a
                                href="/products"
                                whileHover={{ y: -4 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ duration: 0.2 }}
                                className="px-6 py-3 bg-gray-900 text-white rounded-md 
        shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                View Products
                            </motion.a>

                            {/* Contact Us */}
                            <motion.a
                                href="https://wa.me/919860133235"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -4 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ duration: 0.2 }}
                                className="px-6 py-3 border border-gray-300 rounded-md 
        shadow-sm hover:shadow-md 
        hover:border-orange-500 hover:text-orange-500 
        transition-all duration-300"
                            >
                                Contact Us
                            </motion.a>

                        </div>

                    </div>

                    {/* RIGHT VIDEO */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.01 }}
                    >

                        <div className="p-[2px] rounded-2xl bg-gradient-to-r from-red-200 via-orange-200 to-red-200">

                            <video
                                controls
                                className="w-full h-[240px] sm:h-[320px] md:h-[380px] lg:h-[450px] 
            object-cover rounded-2xl bg-white 
            shadow-md hover:shadow-xl 
            transition-all duration-300"
                                poster="/products/bottle1.jpeg"
                            >
                                <source src="/video/Product Video.mp4" type="video/mp4" />
                            </video>

                        </div>

                    </motion.div>

                </div>

            </div>

        </section>
    );
}

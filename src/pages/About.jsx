import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Award, Users, Zap, Globe } from 'lucide-react';
import CountUp from "react-countup";
import { useEffect, useState } from "react";

/* ================= TESTIMONIAL DATA ================= */
const testimonials = [
    {
        text: "Excellent quality bottles and fast delivery. Highly recommended!",
        name: "Rajesh Traders",
    },
    {
        text: "Very professional team and amazing product finish.",
        name: "Kumar Industries",
    },
    {
        text: "Affordable pricing with premium quality. Loved it!",
        name: "Sharma Packaging",
    },
    {
        text: "On-time delivery and great support. Will order again.",
        name: "Global Plastics",
    },
];

/* ================= TESTIMONIAL SLIDER ================= */
function TestimonialSlider() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative max-w-xl mx-auto h-[180px]">

            {testimonials.map((item, i) => (
                <div
                    key={i}
                    className={`absolute w-full transition-all duration-700 ease-in-out
                    ${i === index
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 translate-y-6 scale-95"
                        }`}
                >
                    <div className="p-6 border border-orange-200/60 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition">
                        <p className="text-muted-foreground mb-4">
                            “{item.text}”
                        </p>
                        <h4 className="font-semibold">
                            – {item.name}
                        </h4>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function About() {
    return (
        <>
            {/* HERO */}
            <section className="py-16 px-4 bg-gradient-to-b from-red-50 to-orange-50 border-b border-orange-100 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">
                    About Premier Plastics
                </h1>
                <div className="w-24 h-[2px] bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-4 rounded-full"></div>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    25+ years of excellence in plastic bottle manufacturing
                </p>
            </section>

            {/* MAIN */}
            <section className="pt-5 pb-20 px-4 max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-10 items-center border border-orange-200/60 rounded-xl p-6 md:p-10 bg-white shadow-sm hover:shadow-md transition">

                    {/* LEFT */}
                    <div className="text-center md:text-left flex flex-col items-center md:items-start">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
                            Your Trusted Partner in
                            <span className="block text-orange-500">
                                Plastic Packaging
                            </span>
                        </h2>

                        <p className="text-muted-foreground mb-6 max-w-md md:max-w-none">
                            We manufacture high-quality PET bottles for beverages, cosmetics,
                            pharmaceuticals, and industrial use with precision and reliability.
                        </p>

                        <div className="space-y-3 mb-6 w-full max-w-xs md:max-w-none">
                            {[
                                "ISO Certified Manufacturing",
                                "1000+ Happy Clients Worldwide",
                                "Custom Bottle Design Available"
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 text-sm p-2 rounded-md hover:bg-orange-50 transition justify-center md:justify-start"
                                >
                                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                    {item}
                                </div>
                            ))}
                        </div>

                        <Button
                            asChild
                            className="bg-gradient-to-r from-red-500 to-orange-500 px-5 py-2 hover:scale-105 transition mx-auto md:mx-0"
                        >
                            <Link to="/contact">Start Your Project</Link>
                        </Button>
                    </div>

                    {/* RIGHT */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { icon: Zap, title: "Fast Production" },
                            { icon: Globe, title: "Global Supply" },
                            { icon: Award, title: "Quality Assured" },
                            { icon: Users, title: "Trusted Clients" },
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={i}
                                    className="p-4 rounded-lg border border-orange-200/60 text-center 
                                    hover:shadow-lg hover:-translate-y-1 hover:border-orange-300 
                                    transition-all duration-300 cursor-pointer"
                                >
                                    <Icon className="mx-auto text-orange-500 mb-2 hover:scale-110 transition" size={28} />
                                    <h3 className="text-sm font-semibold">{item.title}</h3>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="py-16 bg-gradient-to-r from-red-500 to-orange-500 text-white">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-8">
                    {[
                        { num: 25, suffix: "+", label: "Years Experience" },
                        { num: 1000, suffix: "+", label: "Clients" },
                        { num: 50, suffix: "M+", label: "Bottles Produced" },
                        { num: 15, suffix: "+", label: "Countries" },
                    ].map((item, i) => (
                        <div key={i} className="hover:scale-105 transition">
                            <h2 className="text-3xl font-bold">
                                <CountUp end={item.num} duration={2} suffix={item.suffix} />
                            </h2>
                            <p>{item.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CERTIFICATIONS */}
            <section className="py-20 px-4 bg-orange-50/40 text-center">
                <h2 className="text-3xl font-bold mb-10">Certifications</h2>

                <div className="flex flex-wrap justify-center gap-6">
                    {["ISO 9001", "FDA Approved", "GMP Certified"].map((item, i) => (
                        <span
                            key={i}
                            className="px-6 py-3 border border-orange-200 rounded-full bg-white shadow-sm 
                            hover:shadow-md hover:-translate-y-1 hover:border-orange-300 
                            transition-all duration-300 cursor-pointer"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </section>

            {/* FACTORY */}
            {/* <section className="py-20 px-4 text-center">
                <h2 className="text-3xl font-bold mb-10">Our Factory</h2>

                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((img, i) => (
                        <div
                            key={i}
                            className="overflow-hidden rounded-xl group"
                        >
                            <img
                                src={`/factory/factory${img}.jpg`}
                                className="rounded-xl shadow-md transform group-hover:scale-110 transition duration-500"
                            />
                        </div>
                    ))}
                </div>
            </section> */}
            {/* TESTIMONIAL */}
            <section className="py-20 px-4 bg-white text-center overflow-hidden">
                <h2 className="text-3xl font-bold mb-10">
                    What Our Clients Say
                </h2>

                <div className="relative max-w-6xl mx-auto overflow-hidden">

                    <div className="flex gap-6 animate-scroll">

                        {[
                            "Excellent quality bottles and fast delivery. Highly recommended!",
                            "Very professional team and amazing product finish.",
                            "Affordable pricing with premium quality. Loved it!",
                            "On-time delivery and great support. Will order again.",
                        ].map((text, i) => (
                            <div
                                key={i}
                                className="min-w-[300px] p-6 border border-orange-200/60 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
                            >
                                <p className="text-muted-foreground mb-4">
                                    “{text}”
                                </p>
                                <h4 className="font-semibold">
                                    – Client {i + 1}
                                </h4>
                            </div>
                        ))}

                        {/* DUPLICATE for infinite loop */}
                        {[
                            "Excellent quality bottles and fast delivery. Highly recommended!",
                            "Very professional team and amazing product finish.",
                            "Affordable pricing with premium quality. Loved it!",
                            "On-time delivery and great support. Will order again.",
                        ].map((text, i) => (
                            <div
                                key={"dup-" + i}
                                className="min-w-[300px] p-6 border border-orange-200/60 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
                            >
                                <p className="text-muted-foreground mb-4">
                                    “{text}”
                                </p>
                                <h4 className="font-semibold">
                                    – Client {i + 1}
                                </h4>
                            </div>
                        ))}

                    </div>
                </div>
            </section>
        </>
    );
}
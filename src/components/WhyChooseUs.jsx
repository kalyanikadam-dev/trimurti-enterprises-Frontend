import { Card } from "./ui/card";
import { ShieldCheck, Factory, Boxes, Palette, Truck, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

const WHY_CHOOSE_US = [
    {
        title: "Exceptional Quality",
        description:
            "Durable and leak-proof bottles manufactured with strict quality control and safety standards.",
        icon: ShieldCheck,
    },
    {
        title: "Advanced Manufacturing",
        description:
            "Modern machinery and automated production ensure precision, consistency and superior finish.",
        icon: Factory,
    },
    {
        title: "Wide Product Range",
        description:
            "Solutions for beverages, cosmetics, pharmaceuticals and industrial packaging.",
        icon: Boxes,
    },
    {
        title: "Custom Bottle Design",
        description:
            "Custom shapes, sizes and branding options that strengthen your product identity.",
        icon: Palette,
    },
    {
        title: "Reliable Delivery",
        description:
            "Strong supply chain and scalable production to fulfill bulk orders on time.",
        icon: Truck,
    },
    {
        title: "Competitive Pricing",
        description:
            "Cost-efficient production allowing high-quality bottles at affordable prices.",
        icon: DollarSign,
    },
];

const GALLERY_IMAGES = [
    "/products/bottle1.jpeg",
    "/products/bottle2.jpeg",
    "/products/bottle10.jpeg",
    "/products/bottle4.jpeg",
    "/products/bottle5.jpeg",
    "/products/bottle6.jpeg",
    "/products/bottle7.jpeg",
    "/products/bottle8.jpeg",
];

export function WhyChooseUs() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-100/50 to-red-50/50">
            {/* Heading */}
            <div className="max-w-7xl mx-auto text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Why Choose Our Plastic Bottle Manufacturing
                </h2>

                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    We combine modern manufacturing technology, strict quality standards,
                    and sustainable production methods to deliver packaging solutions
                    trusted by businesses across multiple industries.
                </p>
            </div>

            {/* Feature Cards */}
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {WHY_CHOOSE_US.map((feature, index) => {
                    const Icon = feature.icon;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Card
                                className="
        p-8 
        bg-white/70 backdrop-blur-md
        
        border border-orange-300/40
        hover:border-emerald-400
        
        shadow-sm hover:shadow-xl
        transition-all duration-300
        
        hover:-translate-y-2
        
        text-center md:text-left
        group
        "
                            >
                                {/* Icon */}
                                <Icon className="h-10 w-10 text-orange-500 mb-5 mx-auto md:mx-0 transition-all duration-300 group-hover:text-emerald-600 group-hover:scale-110" />

                                {/* Title */}
                                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {/* Our Product Gallery */}
            <div className="max-w-7xl mx-auto text-center py-16 px-4">

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-green-500 bg-clip-text text-transparent">
                        Our Product Gallery
                    </span>
                </h2>

                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Premium plastic bottles crafted with precision, durability and eco-friendly materials
                    for modern packaging solutions across multiple industries.
                </p>

                {/* Optional underline accent */}
                <div className="mt-6 flex justify-center">
                    <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-green-500 rounded-full"></div>
                </div>

            </div>

            {/* Photo Gallery */}
            <div className="overflow-hidden">
                <div className="flex animate-scroll gap-6 w-max py-8">
                    {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt="Bottle product"
                            className="h-40 w-60 flex-shrink-0 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                        />
                    ))}
                </div>
            </div>

        </section>
    );
}

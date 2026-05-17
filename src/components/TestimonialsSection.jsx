import { Card } from './ui/card';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
    {
        name: 'John Martinez',
        company: 'Fresh Beverages Inc',
        role: 'Operations Director',
        content: 'Outstanding quality and reliability. They consistently deliver on time and exceeded our expectations on custom design implementation.',
        rating: 5,
        image: '👨‍💼',
    },
    {
        name: 'Sarah Chen',
        company: 'Beauty Essentials',
        role: 'Founder',
        content: 'The cosmetic bottles are perfect for our brand. The customization options and competitive pricing made them our go-to supplier.',
        rating: 5,
        image: '👩‍💼',
    },
    {
        name: 'Michael Thompson',
        company: 'EcoSmart Industries',
        role: 'Supply Chain Manager',
        content: 'Great partner for scaling our production. Their eco-friendly options align with our sustainability goals.',
        rating: 5,
        image: '👨‍💼',
    },
];

export function TestimonialsSection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-rose-50 to-gray-100">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">What Our Clients Say</h2>
                <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
                    Trusted by leading brands across beverages, beauty, and industrial sectors.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {TESTIMONIALS.map((testimonial, idx) => (
                        <Card key={idx} className="p-6 flex flex-col hover:shadow-lg transition-shadow duration-300">
                            <div className="flex gap-1 mb-4">
                                {Array(testimonial.rating)
                                    .fill(0)
                                    .map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                            </div>
                            <p className="text-foreground mb-6 flex-grow italic">{`"${testimonial.content}"`}</p>
                            <div className="flex items-center gap-3">
                                <div className="text-3xl">{testimonial.image}</div>
                                <div>
                                    <div className="font-bold text-foreground">{testimonial.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {testimonial.role} at {testimonial.company}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}


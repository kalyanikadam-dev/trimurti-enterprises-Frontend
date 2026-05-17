import { Card } from './ui/card';
import { CheckCircle2 } from 'lucide-react';

const CERTIFICATIONS = [
    {
        name: 'ISO 9001',
        description: 'Quality Management System',
        icon: '✅',
    },
    {
        name: 'FDA Approved',
        description: 'Food Contact Materials',
        icon: '🏥',
    },
    {
        name: 'ISO 14001',
        description: 'Environmental Management',
        icon: '🌍',
    },
    {
        name: 'BPA Free',
        description: 'Health & Safety Certified',
        icon: '⚠️',
    },
];

export function CertificationsSection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-red-50/70">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Certifications & Compliance</h2>
                <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
                    We meet and exceed international standards for quality, safety, and environmental responsibility.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CERTIFICATIONS.map((cert, idx) => (
                        <Card key={idx} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                            <div className="text-4xl mb-4">{cert.icon}</div>
                            <h3 className="text-xl font-bold text-foreground mb-2">{cert.name}</h3>
                            <p className="text-muted-foreground text-sm">{cert.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}


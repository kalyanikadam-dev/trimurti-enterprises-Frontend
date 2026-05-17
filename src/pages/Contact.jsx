import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { submitContact } from '@/lib/api.js';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return; // 🔥 prevent multiple clicks

        const isValid =
            formData.name.trim() &&
            formData.email.trim() &&
            formData.phone.trim().length === 10 &&
            formData.company.trim() &&
            formData.subject.trim() &&
            formData.message.trim();

        if (!isValid) {
            alert("Please fill all fields");
            return;
        }

        try {
            setIsSubmitting(true); // 🔥 START LOADING

            await submitContact(formData);

            setSubmitted(true);
            setShowPopup(true);

            setTimeout(() => {
                setShowPopup(false);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    company: "",
                    subject: "",
                    message: "",
                });
            }, 5000);

        } catch (error) {
            alert("Error: " + (error.response?.data?.error || error.message));
        } finally {
            setIsSubmitting(false); // 🔥 STOP LOADING
        }
    };

    return (
        <>
            {/* HERO SECTION (SMALL + CLEAN) */}
            <section className="relative h-[180px] flex items-center justify-center text-white overflow-hidden">
                {/* BACKGROUND IMAGE (OPTIMIZED) */}
                <img
                    src="https://images.unsplash.com/photo-1581092919534-5c6b3c9d1d1c"
                    alt="Contact Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* CONTENT */}
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-xl">
                        Contact Us
                    </h1>
                    <p className="text-sm md:text-lg text-gray-200">
                        Let's connect and build something amazing together
                    </p>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section className="py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

                    {/* LEFT SIDE */}
                    <div className="space-y-8">
                        <Card className="p-8 shadow-xl rounded-2xl border-red-400 hover:border-red-500/80">
                            <h2 className="text-2xl font-bold mb-6">Visit Us</h2>

                            <div className="space-y-5 text-muted-foreground">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 mt-1 text-primary" />
                                    <span>Trimurti Enterprises, Phaltan</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 mt-1 text-primary" />
                                    <span>+91 98601 33235</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 mt-1 text-primary" />
                                    <span>trimurtienterprisesphaltan@gmail.com</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock className="w-5 h-5 mt-1 text-primary" />
                                    <span>Mon-Fri 8AM-6PM, Sat 9AM-4PM</span>
                                </div>
                            </div>
                        </Card>

                        {/* GOOGLE MAP */}
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">

                            <iframe
                                src="https://www.google.com/maps?q=Trimurti%20Enterprises%2C%20Phaltan&z=15&output=embed"
                                width="100%"
                                height="250"
                                style={{ border: 0 }}
                                loading="lazy"
                                title="Location Map"
                            ></iframe>

                            {/* Overlay Button */}
                            <div className="absolute bottom-3 right-3">
                                <a
                                    href="https://www.google.com/maps/dir/?api=1&destination=Trimurti+Enterprises+Phaltan"
                                    target="_blank"
                                    className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition"
                                >
                                    Get Directions
                                </a>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT SIDE FORM */}
                    <div>
                        <Card className="p-8 shadow-xl rounded-2xl border-red-400 hover:border-red-500/80">
                            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />

                                <Input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />

                                <Input
                                    type="tel"
                                    placeholder="Phone number (10 digits)"
                                    value={formData.phone}
                                    maxLength={10}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        setFormData({ ...formData, phone: value });
                                    }}
                                />

                                <Input
                                    placeholder="Company / Organization"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                />

                                <Input
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                />

                                <textarea
                                    className="w-full p-3 border border-red-400 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-600 rounded-lg resize-none min-h-[120px]"
                                    placeholder="Your message..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full text-lg py-6"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        </Card>

                        {submitted && showPopup && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md mx-4 text-center border-4 border-green-400 animate-pulse">
                                    <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Thank You!</h3>
                                    <p className="text-lg text-gray-600 mb-6">Message sent successfully. We'll connect with you soon.</p>
                                    <Button
                                        onClick={() => setShowPopup(false)}
                                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl text-lg"
                                    >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

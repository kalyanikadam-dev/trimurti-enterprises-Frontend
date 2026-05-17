import { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import { submitContact } from "@/lib/api";

export function HelpChatButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    // Lead Flow
    const [step, setStep] = useState(0);
    const [userData, setUserData] = useState({
        name: "",
        phone: "",
        email: "",
        product: "",
    });

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Welcome Message
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setTimeout(() => {
                addMessage(
                    "bot",
                    "Hi 👋 I'm the virtual assistant for Trimurti Enterprises. How can I help you today?"
                );
            }, 400);
        }
    }, [isOpen, messages.length]);

    const addMessage = (role, text) => {
        setMessages((prev) => [...prev, { role, text }]);
    };

    // Smart Bot Logic
    const getBotResponse = async (message) => {
        const msg = message.toLowerCase();

        if (step === 0) {
            setStep(1);
            return "Sure! To help you better, may I know your name?";
        }

        if (step === 1) {
            setUserData((prev) => ({ ...prev, name: message }));
            setStep(2);
            return `Nice to meet you! Please share your mobile number 📱`;
        }

        if (step === 2) {
            setUserData((prev) => ({ ...prev, phone: message }));
            setStep(3);
            return "Got it. What is your email address? 📧";
        }

        if (step === 3) {
            setUserData((prev) => ({ ...prev, email: message }));
            setStep(4);
            return "Great. Finally, what type of bottles/products or inquiry do you have?";
        }

        if (step === 4) {
            const finalData = { ...userData, product: message };
            setUserData(finalData);
            setStep(5);
            
            // Actually submit to backend!
            try {
                await submitContact({
                    name: finalData.name,
                    email: finalData.email,
                    phone: finalData.phone,
                    subject: "Chatbot Inquiry",
                    message: finalData.product
                });
                return `Thanks ${finalData.name}! Your inquiry has been sent to our team. We will contact you shortly.`;
            } catch (error) {
                console.error(error);
                return `Thanks ${finalData.name}, but we had an issue saving your request automatically. Please try contacting us via WhatsApp or Phone.`;
            }
        }

        return "Our team will assist you shortly. You can also chat with us on WhatsApp!";
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        addMessage("user", userMsg);
        setInput("");
        setIsTyping(true);

        // Process response
        const botReply = await getBotResponse(userMsg);
        
        setTimeout(() => {
            addMessage("bot", botReply);
            setIsTyping(false);
        }, 800);
    };

    const closeChat = () => {
        setIsOpen(false);
        setTimeout(() => {
            setMessages([]);
            setStep(0);
            setUserData({ name: "", phone: "", email: "", product: "" });
        }, 300); // Clear after animation
    };

    // Quick Replies
    const quickOptions = ["Bulk Order Pricing", "Custom Bottle Design", "Product Catalog"];

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl z-40 transition-all duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 hover:scale-110'} bg-orange-600 text-white hover:bg-orange-700`}
            >
                <MessageCircle className="w-7 h-7" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                </span>
            </button>

            {/* Chat Modal */}
            {isOpen && (
                <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-96 sm:h-[600px] z-50 flex flex-col shadow-2xl rounded-2xl overflow-hidden bg-white border border-gray-200 animate-in slide-in-from-bottom-8 duration-300">
                    
                    {/* Header */}
                    <div className="p-4 flex items-center justify-between bg-gradient-to-r from-orange-600 to-orange-500 text-white">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1">
                                <img src="/products/logo.png" alt="Logo" className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">Trimurti Assistant</h3>
                                <p className="text-xs text-orange-100 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full"></span> Online
                                </p>
                            </div>
                        </div>
                        <button onClick={closeChat} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[85%] px-4 py-2.5 text-sm shadow-sm ${msg.role === "user" ? "bg-orange-600 text-white rounded-2xl rounded-tr-sm" : "bg-white text-gray-800 rounded-2xl rounded-tl-sm border border-gray-100"}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm border border-gray-100 flex gap-1 items-center shadow-sm">
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Replies */}
                    {step === 0 && !isTyping && messages.length > 0 && (
                        <div className="px-4 py-3 bg-white flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide border-t border-gray-100">
                            {quickOptions.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => {
                                        addMessage("user", option);
                                        setIsTyping(true);
                                        setTimeout(async () => {
                                            const reply = await getBotResponse(option);
                                            addMessage("bot", reply);
                                            setIsTyping(false);
                                        }, 600);
                                    }}
                                    className="px-4 py-1.5 text-sm border border-orange-200 text-orange-600 rounded-full hover:bg-orange-50 hover:border-orange-300 transition-colors"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100">
                        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-full">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 px-4 py-2 bg-transparent text-sm focus:outline-none"
                                disabled={step >= 5 || isTyping}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || step >= 5 || isTyping}
                                className="p-2.5 bg-orange-600 text-white rounded-full hover:bg-orange-700 disabled:opacity-50 disabled:bg-gray-400 transition-colors"
                            >
                                <Send className="w-4 h-4 -ml-0.5" />
                            </button>
                        </div>
                    </form>

                    {/* WhatsApp CTA */}
                    {step >= 5 && (
                        <div className="p-3 bg-white border-t border-gray-100 text-center">
                            <a
                                href="https://wa.me/919860133235"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center w-full bg-[#25D366] text-white py-2.5 rounded-xl text-sm font-medium hover:bg-[#20bd5a] transition-colors gap-2 shadow-sm"
                            >
                                <MessageCircle className="w-4 h-4" />
                                Chat on WhatsApp
                            </a>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
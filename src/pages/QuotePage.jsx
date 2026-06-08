import { useParams } from "react-router-dom";
import { useState } from "react";
import { submitQuote, verifyQuote } from '@/lib/api.js';

export default function QuotePage() {
    const { id } = useParams();
    const [step, setStep] = useState(1);

    const productName = `Plastic Bottle ${id === '1' ? '100ml' : id === '2' ? '60ml' : `${id * 100}ml`}`;

    // STATES
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [company, setCompany] = useState("");
    const [quoteId, setQuoteId] = useState("");

    const [selectedColor, setSelectedColor] = useState("");
    const [selectedCapacity, setSelectedCapacity] = useState("");
    const [selectedMaterials, setSelectedMaterials] = useState([]);

    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState("");

    const toggleMaterial = (item) => {
        if (selectedMaterials.includes(item)) {
            setSelectedMaterials(selectedMaterials.filter(m => m !== item));
        } else {
            setSelectedMaterials([...selectedMaterials, item]);
        }
    };

    const [quantity, setQuantity] = useState('');
    const [details, setDetails] = useState('');

    const handleSubmitQuote = async () => {
        if (!name) return alert("Enter name");
        if (!email.includes("@")) return alert("Enter valid email");

        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(mobile)) {
            return alert("Enter valid mobile number");
        }

        if (!company) return alert("Enter company name");
        if (!quantity) return alert("Enter quantity");

        setLoading(true);

        try {
            const requirements = {
                quantity,
                capacity: selectedCapacity || '',
                materials: selectedMaterials,
                color: selectedColor || '',
                details
            };
            const response = await submitQuote({
                name, email, phone: mobile,
                message: `Quote for ${productName} from ${company}`,
                requirements
            });
            if (response?.data?.quoteId) {
                setQuoteId(response.data.quoteId.toString());
                console.log("OTP sent to email!", response.data.quoteId);
                setStep(4);
            } else {
                console.error('No quoteId in response', response);
                alert('Quote submission failed. Please try again.');
            }
        } catch (error) {
            alert('Quote submit error: ' + error.message);
        } finally {
            setLoading(false); 
        }
    };


    const handleOtpVerify = async () => {
        if (!otp) {
            setOtpError("Please enter OTP");
            return;
        }

        if (otp.length !== 4 || !/^\d{4}$/.test(otp)) {
            setOtpError("Invalid OTP - Check email");
            return;
        }

        try {
            const response = await verifyQuote({ quoteId, otp });
            if (response?.data?.verified) {
                setStep(5);
            } else {
                setOtpError(response?.data?.error || 'Invalid OTP');
            }
        } catch (error) {
            setOtpError(error.response.data.error || 'Verification failed');
        }
    };

    const [loading, setLoading] = useState(false);

    return (
        <div className="p-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 py-20">

            {/* LEFT */}
            <div>
                <img
                    src={`/produc_Image/prod${id}.jpeg`}
                    alt={productName}
                    className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
                <h2 className="text-2xl font-bold mt-6">{productName}</h2>
                <p className="text-muted-foreground mt-2">
                    ₹{id === '1' ? '5' : id === '2' ? '4' : '6'} / unit
                </p>
            </div>

            {/* RIGHT */}
            <div className="border p-8 rounded-xl shadow-lg border-orange-300">

                {/* STEP 1 */}
                {step === 1 && (
                    <>
                        <h2 className="text-2xl font-bold mb-6">
                            Supplier wants to know more about you
                        </h2>

                        <div className="space-y-4">

                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input"
                                placeholder="Enter your name *"
                            />

                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input"
                                placeholder="Enter your email *"
                            />
                            <p className="text-xs text-muted-foreground pl-1 mt-1">
                                We will contact you on this email (OTP will arrive).
                            </p>

                            {/* MOBILE */}
                            <input
                                type="tel"
                                value={mobile}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "");
                                    if (value.length <= 10) setMobile(value);
                                }}
                                className="input"
                                placeholder="Enter your mobile number *"
                            />

                            <div>
                                <input
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    className="input"
                                    placeholder="Company / Business Name *"
                                />
                                <p className="text-xs text-muted-foreground pl-1 mt-1">
                                    Eg: John Enterprises, Suguna Foods Private Limited
                                </p>
                            </div>

                            <div>
                                <input
                                    className="input"
                                    placeholder="Website URL (optional)"
                                />
                            </div>

                        </div>

                        <div className="space-y-4 mt-6">
                            <button
                                onClick={() => setStep(2)}
                                className="btn w-full bg-gray-200 text-black hover:bg-gray-300"
                            >
                                Next: Requirements
                            </button>
                        </div>

                    </>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <>
                        <h2 className="text-2xl font-bold mb-2">
                            Requirement Details
                        </h2>

                        <p className="text-sm text-muted-foreground mb-6">
                            Adding a few details of your requirement can get you quick response from the supplier
                        </p>

                        <div className="space-y-5">

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Quantity *
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        className="input flex-1"
                                        placeholder="Enter quantity *"
                                    />

                                    <span className="flex items-center px-3 border rounded-md text-sm bg-muted">
                                        Piece
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Capacity
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {["30 ml", "15 ml", "10 ml", "5 ml", "100 ml", "60 ml"].map((item) => {
                                        const isSelected = selectedCapacity === item;

                                        return (
                                            <button
                                                key={item}
                                                onClick={() => setSelectedCapacity(item)}
                                                className={`flex items-center gap-2 px-3 py-1.5 text-sm border rounded-full transition
                                    ${isSelected ? "bg-primary text-white border-primary" : "hover:bg-primary/10"}`}
                                            >
                                                <span className={`w-4 h-4 flex items-center justify-center rounded-full border
                                        ${isSelected ? "bg-white border-white" : "border-gray-400"}`}>
                                                    {isSelected && <span className="w-2 h-2 bg-primary rounded-full"></span>}
                                                </span>
                                                {item}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Material
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {["HDPE", "LDPE", "PET", "Virgin Plastic"].map((item) => {
                                        const isSelected = selectedMaterials.includes(item);

                                        return (
                                            <button
                                                key={item}
                                                onClick={() => toggleMaterial(item)}
                                                className={`flex items-center gap-2 px-3 py-1.5 text-sm border rounded-full transition
                                    ${isSelected ? "bg-primary text-white border-primary" : "hover:bg-primary/10"}`}
                                            >
                                                <span className={`w-4 h-4 flex items-center justify-center rounded-full border
                                        ${isSelected ? "bg-white border-white" : "border-gray-400"}`}>
                                                    {isSelected && <span className="w-2 h-2 bg-primary rounded-full"></span>}
                                                </span>
                                                {item}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Requirement Details
                                </label>
                                <textarea
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                    className="input"
                                    rows="4"
                                    placeholder="Describe your requirement in detail..."
                                />

                            </div>

                        </div>

                        <button
                            onClick={() => setStep(3)}
                            className="btn mt-6 w-full"
                        >
                            Next: Verify
                        </button>
                    </>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <>
                        <h2 className="text-2xl font-bold mb-2">
                            Almost done!
                        </h2>

                        <p className="text-sm text-muted-foreground mb-6">
                            You are just a click away from getting quotes
                        </p>

                        <div className="space-y-5">

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Color
                                </label>

                                <div className="flex flex-wrap gap-2">
                                    {["White", "Transparent", "Milky White", "Black", "Amber", "Yellow & White"].map((item) => {
                                        const isSelected = selectedColor === item;

                                        return (
                                            <button
                                                key={item}
                                                onClick={() => setSelectedColor(item)}
                                                className={`flex items-center gap-2 px-3 py-1.5 text-sm border rounded-full transition
                                    ${isSelected ? "bg-primary text-white border-primary" : "hover:bg-primary/10"}`}
                                            >
                                                <span className={`w-4 h-4 flex items-center justify-center rounded-full border
                                        ${isSelected ? "bg-white border-white" : "border-gray-400"}`}>
                                                    {isSelected && <span className="w-2 h-2 bg-primary rounded-full"></span>}
                                                </span>
                                                {item}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Requirement Details
                                </label>
                                <textarea
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                    className="input"
                                    rows="4"
                                    placeholder="Describe your requirement in detail..."
                                />

                            </div>

                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setStep(2)}
                                className="btn w-1/2 bg-gray-200 text-black"
                            >
                                Back
                            </button>

                            <button
                                onClick={handleSubmitQuote}
                                className="btn w-1/2 flex items-center justify-center disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                        Submitting...
                                    </span>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </div>
                    </>
                )}

                {/* STEP 4 OTP */}
                {step === 4 && (
                    <div className="flex flex-col items-center justify-center h-full">

                        <div className="w-full max-w-sm">

                            <h2 className="text-2xl font-bold mb-2 text-center">
                                Confirm Your Requirement
                            </h2>

                            <p className="text-sm text-muted-foreground mb-4 text-center">
                                OTP sent to +91 *****{mobile.slice(-4)}
                            </p>

                            <div className="space-y-5">

                                <div className="flex flex-col items-center">
                                    <input
                                        type="text"
                                        maxLength={4}
                                        value={otp}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, "");
                                            setOtp(value);
                                            setOtpError("");
                                        }}
                                        className="input text-center tracking-[10px] text-xl w-40"
                                        placeholder="----"
                                    />

                                    {otpError && (
                                        <p className="text-red-500 text-sm mt-2 text-center">
                                            {otpError}
                                        </p>
                                    )}
                                </div>

                                <p className="text-xs text-gray-400 text-center">
                                    Check your email for real OTP!
                                </p>

                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setStep(3)}
                                    className="btn w-1/2 bg-gray-200 text-black"
                                >
                                    Back
                                </button>

                                <button
                                    onClick={handleOtpVerify}
                                    className="btn w-1/2"
                                >
                                    Confirm Requirement
                                </button>
                            </div>

                        </div>
                    </div>
                )}

                {/* STEP 5 */}
                {step === 5 && (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                            <span className="text-3xl">✅</span>
                        </div>
                        <h2 className="text-3xl font-bold text-green-600 mb-4">
                            Thank You!
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Your requirement has been submitted successfully. You will receive quotes from suppliers soon.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

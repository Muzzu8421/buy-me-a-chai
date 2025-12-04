"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UserPaymentPage = ({ username }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [customAmount, setCustomAmount] = useState("");
    const [message, setMessage] = useState("");
    const [paymentProcessing, setPaymentProcessing] = useState(false);

    // Sample user data - replace with actual API call
    const userData = {
        name: "John Doe",
        username: username || "johndoe",
        profileImage: null,
        coverImage: null,
        bio: "Creating amazing content for the community. Support me with a chai! ☕",
        totalSupporters: 247,
        totalChais: 1823,
        recentSupports: [
            { name: "Alice", amount: 50, message: "Great work!", time: "2 mins ago" },
            { name: "Bob", amount: 100, message: "Keep it up! 🔥", time: "1 hour ago" },
            { name: "Charlie", amount: 30, message: "Love your content", time: "3 hours ago" },
        ],
    };

    const predefinedAmounts = [10, 20, 50, 100, 200, 500];

    const handlePayment = async () => {
        if (!session) {
            router.push("/login");
            return;
        }

        const amount = selectedAmount || parseInt(customAmount);
        if (!amount || amount < 10) {
            alert("Please select or enter an amount (minimum ₹10)");
            return;
        }

        setPaymentProcessing(true);
        // Add your payment logic here (Razorpay/Stripe integration)
        console.log({ amount, message, to: userData.username });

        // Simulate API call
        setTimeout(() => {
            setPaymentProcessing(false);
            alert("Payment successful! Thank you for your support! ☕");
            setSelectedAmount(null);
            setCustomAmount("");
            setMessage("");
        }, 2000);
    };

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Cover Image */}
                <div className="relative h-48 sm:h-64 rounded-t-2xl overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500">
                    {userData.coverImage ? (
                        <img
                            src={userData.coverImage}
                            alt="Cover"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-white text-4xl">☕</span>
                        </div>
                    )}
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-b-2xl shadow-2xl border border-white/20 p-6 sm:p-8 -mt-16 relative z-10">
                    {/* Profile Section */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                        <div className="w-32 h-32 rounded-full border-4 border-yellow-400 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-5xl shadow-xl flex-shrink-0">
                            {userData.profileImage ? (
                                <img
                                    src={userData.profileImage}
                                    alt={userData.name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                userData.name.charAt(0).toUpperCase()
                            )}
                        </div>

                        <div className="flex-1 text-center sm:text-left">
                            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                                {userData.name}
                            </h1>
                            <p className="text-yellow-400 mb-3">@{userData.username}</p>
                            <p className="text-gray-300 mb-4 max-w-2xl">{userData.bio}</p>

                            <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6">
                                <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/20">
                                    <p className="text-2xl font-bold text-yellow-400">
                                        {userData.totalSupporters}
                                    </p>
                                    <p className="text-sm text-gray-300">Supporters</p>
                                </div>
                                <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/20">
                                    <p className="text-2xl font-bold text-yellow-400">
                                        {userData.totalChais}
                                    </p>
                                    <p className="text-sm text-gray-300">Chais Received</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Payment Section */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                    <span>☕</span> Buy {userData.name.split(" ")[0]} a Chai
                                </h2>

                                {/* Predefined Amounts */}
                                <div className="mb-6">
                                    <label className="block text-gray-300 mb-3 font-medium">
                                        Select Amount
                                    </label>
                                    <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
                                        {predefinedAmounts.map((amount) => (
                                            <button
                                                key={amount}
                                                onClick={() => {
                                                    setSelectedAmount(amount);
                                                    setCustomAmount("");
                                                }}
                                                className={`py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${selectedAmount === amount
                                                        ? "bg-yellow-400 text-[#2A2146] scale-105 shadow-lg"
                                                        : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                                                    }`}
                                            >
                                                ₹{amount}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Custom Amount */}
                                <div className="mb-6">
                                    <label className="block text-gray-300 mb-2 font-medium">
                                        Or Enter Custom Amount
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter amount (min ₹10)"
                                        value={customAmount}
                                        onChange={(e) => {
                                            setCustomAmount(e.target.value);
                                            setSelectedAmount(null);
                                        }}
                                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                        min="10"
                                    />
                                </div>

                                {/* Message */}
                                <div className="mb-6">
                                    <label className="block text-gray-300 mb-2 font-medium">
                                        Add a Message (Optional)
                                    </label>
                                    <textarea
                                        placeholder="Say something nice..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows="3"
                                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                                        maxLength="200"
                                    />
                                    <p className="text-sm text-gray-400 mt-1">
                                        {message.length}/200 characters
                                    </p>
                                </div>

                                {/* Payment Button */}
                                <button
                                    onClick={handlePayment}
                                    disabled={paymentProcessing}
                                    className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-200 ${paymentProcessing
                                            ? "bg-gray-500 cursor-not-allowed"
                                            : "bg-yellow-400 text-[#2A2146] hover:bg-yellow-500 hover:scale-[1.02] shadow-lg hover:shadow-yellow-400/50"
                                        }`}
                                >
                                    {paymentProcessing ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg
                                                className="animate-spin h-5 w-5"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                    fill="none"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                />
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : (
                                        `Support with ₹${selectedAmount || customAmount || "0"}`
                                    )}
                                </button>

                                {!session && (
                                    <p className="text-center text-gray-400 mt-4 text-sm">
                                        <Link href="/login" className="text-yellow-400 hover:underline">
                                            Log in
                                        </Link>{" "}
                                        to support this creator
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Recent Supporters */}
                        <div className="lg:col-span-1">
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 sticky top-24">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <span>🎉</span> Recent Supporters
                                </h3>
                                <div className="space-y-4">
                                    {userData.recentSupports.map((support, index) => (
                                        <div
                                            key={index}
                                            className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors duration-200"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-sm">
                                                        {support.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-white">
                                                            {support.name}
                                                        </p>
                                                        <p className="text-xs text-gray-400">
                                                            {support.time}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-md text-sm font-semibold">
                                                    ₹{support.amount}
                                                </span>
                                            </div>
                                            {support.message && (
                                                <p className="text-sm text-gray-300 italic">
                                                    "{support.message}"
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPaymentPage;

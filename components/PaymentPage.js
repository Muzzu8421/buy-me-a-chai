"use client";
import React from "react";
import Script from "next/script";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser, fetchpayment, initiate } from "@/actions/useractions";
import Link from "next/link";

const PaymentPage = ({ username }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [currentuser, setcurrentuser] = useState({});
  const [payments, setpayments] = useState([]);

  // Fetch user data on component mount
  React.useEffect(() => {
    getdata();
  }, [username]);

  const getdata = async () => {
    try {
      let u = await fetchuser(username);
      setcurrentuser(u);
      let dbpayments = await fetchpayment(username);
      setpayments(dbpayments);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Predefined user data (could be fetched from a database)
  const userData = {
    name: username
      ? username.charAt(0).toUpperCase() + username.slice(1)
      : "John Doe",
    username: username || "johndoe",
    profileImage: null,
    coverImage: null,
    bio: "Creating amazing content for the community. Support me with a chai! ☕",
    totalSupporters: payments ? new Set(payments.map((payment) => payment.name)).size
      : 0,
    totalChais: payments.length
      ? payments.reduce((total, payment) => total + payment.amount, 0)
      : 0,
  };

  const predefinedAmounts = [10, 20, 50, 100, 200, 500];
  const amount = selectedAmount || parseInt(customAmount) || 0;

  const pay = async (amount) => {
    // Build paymentform object with current values
    const currentPaymentForm = {
      name: name,
      amount: amount,
      message: message,
    };

    console.log("Payment data:", { amount, username, currentPaymentForm });

    if (!username) {
      alert("Error: Username not found");
      return;
    }

    if (!currentPaymentForm.name || currentPaymentForm.name.trim() === "") {
      alert("Please enter your name");
      return;
    }

    try {
      let a = await initiate(amount, username, currentPaymentForm);
      let orderId = a.id;
      var options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "Buy Me A Chai",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: orderId,
        callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
        prefill: {
          name: currentPaymentForm.name,
          email: session?.user?.email || "supporter@example.com",
          contact: "+919876543210",
        },
        notes: {
          to_username: username,
          from_name: currentPaymentForm.name,
          message: currentPaymentForm.message,
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed: " + error.message);
    }
  };

  const handlePayment = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    if (amount >= 10) {
      await pay(amount);
    } else {
      alert("Minimum amount is ₹10");
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Wrapper to fix white line */}
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            {/* Cover Image */}
            <div className="relative h-48 sm:h-64 bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500">
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

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 -mt-16 relative z-10">
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
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-1">
                      Buy {userData.name.split(" ")[0]} a Chai<span>☕</span>
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
                            className={`py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                              selectedAmount === amount
                                ? "bg-yellow-400 text-[#2A2146] scale-105 shadow-lg"
                                : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                            }`}
                          >
                            ₹{amount}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name Input */}
                    <div className="mb-6">
                      <label className="block text-gray-300 mb-2 font-medium">
                        Enter Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
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
                      className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-200 ${
                        amount >= 10
                          ? "bg-yellow-400 text-[#2A2146] hover:scale-105 shadow-lg"
                          : "bg-white/10 text-white cursor-not-allowed"
                      }`}
                      disabled={amount < 10}
                    >
                      {`Support with ₹${selectedAmount || customAmount || "0"}`}
                    </button>

                    {!session && (
                      <p className="text-center text-gray-400 mt-4 text-sm">
                        <Link
                          href="/login"
                          className="text-yellow-400 hover:underline"
                        >
                          Log in
                        </Link>{" "}
                        to support this creator
                      </p>
                    )}
                  </div>
                </div>

                {/* Recent Supporters - UNCHANGED */}
                <div className="lg:col-span-1">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 sticky top-24">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Recent Supporters
                    </h3>
                    <div className="space-y-4">
                      {payments.slice(0, 5).map((support, index) => (
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
      </div>
    </>
  );
};

export default PaymentPage;

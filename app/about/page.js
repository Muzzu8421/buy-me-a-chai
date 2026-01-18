import Footer from "@/components/Footer";
import React from "react";

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-4 py-16 mx-auto text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            About Get Me A Chai
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            A crowdfunding platform for creators to receive support from their
            fans and community.
          </p>
        </div>
      </div>

      <div className="border-t-2 border-yellow-400 opacity-80"></div>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-12">
          {/* What We Do */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">What We Do</h2>
            <p className="text-gray-300 leading-relaxed">
              Get Me A Chai connects creators with their supporters through a
              simple, secure platform. Fans can show their appreciation by
              buying creators a virtual chai, helping them continue doing what
              they love.
            </p>
          </div>

          {/* How It Works */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
            <div className="space-y-3 text-gray-300">
              <p>• Creators set up their profile and share their page</p>
              <p>
                • Supporters visit the page and choose an amount to contribute
              </p>
              <p>• Payments are processed securely through Razorpay</p>
              <p>• Creators receive funds directly to their account</p>
            </div>
          </div>

          {/* Why Get Me A Chai */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              Why Get Me A Chai
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We believe in empowering creators to build sustainable income
              streams. Our platform provides a simple way for fans to directly
              support the creators they love, one chai at a time.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;

export const metadata = {
  title: 'About - Get Me A Chai',
}
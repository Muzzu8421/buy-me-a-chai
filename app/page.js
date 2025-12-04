export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="hero-sec flex flex-col items-center justify-center px-2 py-20 mx-auto text-white gap-5">
        <h1 className="text-3xl xs:text-4xl font-bold flex items-center gap-2 sm:gap-4">
          <img
            src="cup.gif"
            alt="cup-gif"
            width={70}
            className="sm:w-24 w-16"
          />
          <span className="text-center">Support Creators. Sip & Inspire.</span>
          <img
            src="cup.gif"
            alt="cup-gif"
            width={70}
            className="sm:w-24 w-16"
          />
        </h1>
        <p className="text-base text-center sm:text-lg max-w-xl mx-auto px-2 sm:px-0">
          A crowdfunding platform dedicated to supporting creators and
          innovators. Join us in empowering dreams with every chai.
        </p>
        <div className="btns flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-md mx-auto justify-center">
          <button type="button" className="btn w-full sm:w-auto">
            Support Creators
          </button>
          <button type="button" className="btn w-full sm:w-auto">
            Read More
          </button>
        </div>
      </div>

      <div className="border-t-2 border-yellow-400 opacity-80 shadow-yellow-400/50"></div>
      {/* Features Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-semibold mb-10 text-white">
          How Fans Empower Creators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* Point 1 */}
          <div className="flex flex-col items-center space-y-4 p-6">
            <span
              className="w-24 h-24 bg-cover rounded-full bg-center"
              style={{ backgroundImage: 'url("fund.gif")' }}
            ></span>
            <p className="text-white font-medium">
              Support creators with monthly contributions.
            </p>
          </div>

          {/* Point 2 */}
          <div className="flex flex-col items-center space-y-4 p-6">
            <span
              className="w-24 h-24 bg-cover rounded-full bg-center"
              style={{ backgroundImage: 'url("Premium.gif")' }}
            ></span>
            <p className="text-white font-medium">
              Access exclusive content and rewards.
            </p>
          </div>

          {/* Point 3 */}
          <div className="flex flex-col items-center space-y-4 p-6">
            <span
              className="w-24 h-24 rounded-full bg-center bg-[length:125px]"
              style={{
                backgroundImage: 'url("Onlinechat.gif")',
              }}
            ></span>
            <p className="text-white font-medium">
              Join chats and connect with creators.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t-2 border-yellow-400 opacity-80 shadow-yellow-400/50"></div>

      {/* Call to Action Section */}
      <section className="flex justify-center py-10 px-4 sm:py-16 sm:px-6">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl min-w-[65vw] max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl border border-yellow-100/20 shadow-lg text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-10 mx-6 sm:mx-12 mb-6 text-white drop-shadow-lg leading-tight">
            Fuel Creativity, One Cup at a Time
          </h2>
          <p className="text-yellow-100 mb-10 px-6 sm:px-12 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Join thousands of creators and passionate fans shaping the future
            with every chai. Start your journey or support the dreams you love.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 px-6 sm:px-12 mb-12">
            <button className="bg-white text-[#F59E0B] font-bold rounded-full px-8 py-3 shadow-md hover:scale-105 hover:bg-yellow-50 hover:text-orange-500 transition w-full sm:w-auto">
              Start Your Campaign
            </button>
            <a
              href="#"
              className="text-white font-semibold underline hover:text-yellow-200 transition flex items-center justify-center w-full sm:w-auto"
            >
              Learn How It Works
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

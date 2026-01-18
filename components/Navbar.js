"use client";
import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showdropdown, setShowdropdown] = useState(false);
  const { data: session, status } = useSession();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 w-full bg-[#2A2146] flex flex-wrap sm:flex-nowrap justify-between items-center px-4 sm:px-6 lg:px-12 py-3 z-50 shadow-lg">
      <Link href="/" className="flex items-center">
        <div className="logo flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <span
            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-center bg-[length:60px] sm:bg-[length:70px]"
            style={{ backgroundImage: 'url("favicon.ico")' }}
            role="img"
            aria-label="Get Me A Chai logo"
          />
          <p className="text-white font-semibold text-lg sm:text-xl lg:text-2xl select-none hidden sm:block">
            Get Me A Chai
          </p>
        </div>
      </Link>

      {/* Hamburger for mobile */}
      <button
        className="sm:hidden text-white focus:outline-none p-2 rounded-md hover:bg-white/10 transition-colors duration-200"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Navigation links */}
      <ul
        className={`${
          menuOpen ? "flex" : "hidden"
        } sm:flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 lg:gap-10 text-white font-medium sm:font-semibold text-sm sm:text-base w-full sm:w-auto mt-4 sm:mt-0 pb-4 sm:pb-0 px-2 sm:px-0`}
      >
        {navLinks.map(({ href, label }) => (
          <li key={href} className="relative group whitespace-nowrap">
            <Link
              href={href}
              className="block py-2 sm:py-0 px-2 sm:px-0 rounded-md sm:rounded-none hover:bg-white/10 sm:hover:bg-transparent after:content-[''] after:absolute after:left-2 sm:after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-500 sm:group-hover:after:w-full transition cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          </li>
        ))}

        {session && (
          <li
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setShowdropdown(false);
              }
            }}
            className="relative w-full sm:w-auto"
          >
            <button
              onClick={() => setShowdropdown(!showdropdown)}
              className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto text-white hover:text-yellow-400 focus:ring-1 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 sm:px-4 py-2 text-center transition-colors duration-200 hover:bg-white/10 sm:hover:bg-transparent"
              type="button"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-yellow-400 flex items-center justify-center text-[#2A2146] font-semibold text-xs sm:text-sm">
                  {session.user.name.charAt(0).toUpperCase()}
                </div>
                <span className="block sm:hidden lg:block text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">
                  Welcome, {session.user.email.split("@")[0]}
                </span>
                <span className="hidden sm:block lg:hidden text-sm">
                  Welcome
                </span>
              </div>
              <svg
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 ms-2 sm:ms-3 flex-shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {/* Dropdown menu */}
            <div
              className={`z-10 absolute left-0 sm:right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-full sm:w-56 min-w-[200px] border border-gray-200 ${
                showdropdown ? "" : "hidden"
              }`}
            >
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <Link
                    href="/Dashboard"
                    className="block px-4 py-3 sm:py-2 hover:bg-yellow-50 hover:text-[#2A2146] transition-colors duration-150"
                    onClick={() => setShowdropdown(false)}
                    disabled={status === "loading"}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${session.user.name}`}
                    className="block px-4 py-3 sm:py-2 hover:bg-yellow-50 hover:text-[#2A2146] transition-colors duration-150"
                    onClick={() => setShowdropdown(false)}
                  >
                    Your Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="block w-full text-left px-4 py-3 sm:py-2 hover:bg-red-50 hover:text-red-700 text-red-600 transition-colors duration-150"
                    onClick={() => signOut()}
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </li>
        )}

        {!session && (
          <li className="w-full sm:w-auto">
            <Link href="/login">
              <button
                className="btn text-[#2A2146] bg-yellow-400 rounded-md px-4 py-2 sm:py-1 font-semibold hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 transition-all duration-200 w-full sm:w-auto text-sm sm:text-base"
                onClick={() => {
                  setMenuOpen(false);
                }}
              >
                Log in
              </button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

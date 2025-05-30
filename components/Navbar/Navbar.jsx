import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <nav className="relative z-50 bg-transparent shadow px-2 mt-0 backdrop-blur-md backdrop-saturate-150">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 relative z-50">
        {/* Left: App Name */}
        <div className="flex-1 flex items-center">
          <Link to="/" className="text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.7)] font-extrabold text-xl tracking-wider font-century-gothic">
            GameVice
          </Link>
        </div>
        {/* Center: Nav Links */}
        <div className="flex-1 hidden md:flex justify-center space-x-4 font-century-gothic">
          <Link to="/" className="text-green-400 hover:text-green-300 hover:bg-green-900/30 px-3 py-2 rounded transition font-semibold drop-shadow-[0_0_6px_rgba(34,197,94,0.5)]">
            Home
          </Link>
          <Link to="/about" className="text-green-400 hover:text-green-300 hover:bg-green-900/30 px-3 py-2 rounded transition font-semibold drop-shadow-[0_0_6px_rgba(34,197,94,0.5)]">
            About
          </Link>
          <Link to="/contact" className="text-green-400 hover:text-green-300 hover:bg-green-900/30 px-3 py-2 rounded transition font-semibold drop-shadow-[0_0_6px_rgba(34,197,94,0.5)]">
            Contact
          </Link>
        </div>
        {/* Right: Search Field, Search Icon & Mobile Menu Button */}
        <div className="flex-1 flex items-center justify-end space-x-2">
          {/* Search Field */}
          <div className="hidden md:flex items-center bg-green-900/30 rounded px-2 shadow-md font-century-gothic">
            <input
              type="text"
              className="bg-transparent outline-none text-green-100 placeholder-green-300 px-2 py-1"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="text-green-400 hover:text-green-300" aria-label="Search">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden font-century-gothic">
            <button
              onClick={() => setOpen(!open)}
              className="text-green-400 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {open ? (
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
          </div>
        </div>
      </div>
      {/* Mobile menu - absolutely positioned to overlay content, but below nav bar */}
      {open && (
        <div className="md:hidden absolute top-0 left-0 w-full z-40 px-2 pb-3 pt-16 space-y-1 bg-green-950/95 shadow-lg backdrop-blur-md backdrop-saturate-150 rounded-b-xl font-century-gothic">
          {/* Mobile Search Field */}
          <div className="flex items-center bg-green-900/30 rounded px-2 mb-2 shadow-md">
            <input
              type="text"
              className="bg-transparent outline-none text-green-100 placeholder-green-300 px-2 py-1 w-full"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="text-green-400 hover:text-green-300" aria-label="Search">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <Link to="/" onClick={() => setOpen(false)} className="block text-green-400 hover:text-green-300 hover:bg-green-900/30 px-3 py-2 rounded transition font-semibold drop-shadow-[0_0_6px_rgba(34,197,94,0.5)]">
            Home
          </Link>
          <Link to="/about" onClick={() => setOpen(false)} className="block text-green-400 hover:text-green-300 hover:bg-green-900/30 px-3 py-2 rounded transition font-semibold drop-shadow-[0_0_6px_rgba(34,197,94,0.5)]">
            About
          </Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="block text-green-400 hover:text-green-300 hover:bg-green-900/30 px-3 py-2 rounded transition font-semibold drop-shadow-[0_0_6px_rgba(34,197,94,0.5)]">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
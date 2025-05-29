import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <nav className="bg-transparent shadow px-2 mt-0 backdrop-blur-md backdrop-saturate-150">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Left: App Name */}
        <div className="flex-1 flex items-center">
          <div className="text-green-400 font-extrabold text-xl tracking-wider drop-shadow-lg">Stackly</div>
        </div>
        {/* Center: Nav Links */}
        <div className="flex-1 hidden md:flex justify-center space-x-4">
          <a href="#" className="text-green-400 hover:text-green-500 hover:bg-gray-800/60 px-3 py-2 rounded transition font-semibold">
            Home
          </a>
          <a href="#" className="text-green-400 hover:text-green-500 hover:bg-gray-800/60 px-3 py-2 rounded transition font-semibold">
            About
          </a>
          <a href="#" className="text-green-400 hover:text-green-500 hover:bg-gray-800/60 px-3 py-2 rounded transition font-semibold">
            Contact
          </a>
        </div>
        {/* Right: Search Field, Search Icon & Mobile Menu Button */}
        <div className="flex-1 flex items-center justify-end space-x-2">
          {/* Search Field */}
          <div className="hidden md:flex items-center bg-gray-800/60 rounded px-2 shadow-md">
            <input
              type="text"
              className="bg-transparent outline-none text-gray-100 placeholder-green-500 px-2 py-1"
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
          <div className="md:hidden">
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
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-2 pb-3 space-y-1 bg-gray-900/60 rounded-b-xl shadow-lg backdrop-blur-md">
          {/* Mobile Search Field */}
          <div className="flex items-center bg-gray-800/60 rounded px-2 mb-2 shadow-md">
            <input
              type="text"
              className="bg-transparent outline-none text-gray-100 placeholder-gray-400 px-2 py-1 w-full"
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
          <a href="#" className="block text-gray-200 hover:text-green-400 hover:bg-gray-800/60 px-3 py-2 rounded transition font-semibold">
            Home
          </a>
          <a href="#" className="block text-gray-200 hover:text-green-400 hover:bg-gray-800/60 px-3 py-2 rounded transition font-semibold">
            About
          </a>
          <a href="#" className="block text-gray-200 hover:text-green-400 hover:bg-gray-800/60 px-3 py-2 rounded transition font-semibold">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
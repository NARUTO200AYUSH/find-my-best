"use client";

import { useState } from "react";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/20">

      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
           📍 <span>FindMyBest</span>
        </h1>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">

          <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full transition flex items-center gap-2">
            ⚖️ Compare
          </button>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4">

          <button className="w-full bg-blue-500 text-white py-2 rounded-lg">
            Compare
          </button>

        </div>
      )}

    </nav>
  );
}
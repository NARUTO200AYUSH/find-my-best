"use client";

import { School } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [count, setCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const updateCount = () => {
      const data = JSON.parse(localStorage.getItem("compare") || "[]");
      setCount(data.length);
    };

    updateCount();

    window.addEventListener("storage", updateCount);
    return () => {
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/10">

      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* ✅ CLICKABLE LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <School className="text-blue-600" size={20} />
          <span className="text-xl font-bold text-gray-800">
            FindMyBest
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">

          <button
            onClick={() => router.push("/compare")}
            className="relative text-sm font-medium text-gray-800 px-4 py-1.5 rounded-lg bg-white/40 backdrop-blur transition hover:bg-blue-100 hover:text-blue-700"
          >
            Compare

            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {count}
              </span>
            )}
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

          <button
            onClick={() => router.push("/compare")}
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
          >
            Compare
          </button>

        </div>
      )}

    </nav>
  );
}
"use client";

import {
  School,
  UserCircle2,
} from "lucide-react";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  const [count, setCount] = useState(0);

  const router = useRouter();

  useEffect(() => {

    const updateCount = () => {

      const data = JSON.parse(
        localStorage.getItem("compare") || "[]"
      );

      setCount(data.length);

    };

    updateCount();

    window.addEventListener(
      "storage",
      updateCount
    );

    return () => {

      window.removeEventListener(
        "storage",
        updateCount
      );

    };

  }, []);

  return (

    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/8 border-b border-white/10">

      <div className="max-w-7xl mx-auto px-8 py-3 flex items-center">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition"
        >

          <School
            className="text-blue-600"
            size={20}
          />

          <span className="text-xl font-bold text-gray-800">
            FindMyBest
          </span>

        </Link>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:flex items-center gap-4 ml-auto">

          {/* COMPARE */}
          <button
            onClick={() =>
              router.push("/compare")
            }
            className="relative text-sm font-medium text-gray-800 px-4 py-1.5 rounded-lg bg-white/40 backdrop-blur transition hover:bg-blue-100 hover:text-blue-700"
          >

            Compare

            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {count}
              </span>
            )}

          </button>

          {/* ACCOUNT */}
          <button
            onClick={() =>
              router.push("/admin/login")
            }
            className="text-gray-700 hover:text-blue-700 transition flex items-center justify-center ml-1"
          >

            <UserCircle2 size={30} />

          </button>

        </div>

        {/* ================= MOBILE HAMBURGER ================= */}
        <button
          className="md:hidden ml-auto relative text-[34px] leading-none text-gray-800"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >

          ☰

          {count > 0 && !menuOpen && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-medium shadow">
              {count}
            </span>
          )}

        </button>

      </div>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (

        <div className="md:hidden px-6 pb-4 space-y-3">

          {/* COMPARE */}
          <button
            onClick={() => {

              router.push("/compare");

              setMenuOpen(false);

            }}
            className="relative w-full text-sm font-medium text-gray-800 px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm transition hover:bg-blue-50 hover:text-blue-700"
          >

            Compare

            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {count}
              </span>
            )}

          </button>

          {/* ACCOUNT */}
          <button
            onClick={() => {

              router.push("/admin/login");

              setMenuOpen(false);

            }}
            className="w-full text-sm font-medium text-gray-800 px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm transition hover:bg-blue-50 hover:text-blue-700 flex items-center justify-center gap-2"
          >

            <UserCircle2 size={20} />

            Account

          </button>

        </div>

      )}

    </nav>
  );
}
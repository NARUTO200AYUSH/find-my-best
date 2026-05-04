"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  ArrowLeft,
} from "lucide-react";

import { auth } from "@/lib/firebase";

export default function AdminLoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleLogin(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      router.push(
        "/admin/dashboard"
      );

    } catch (error: any) {

      console.log(error);

      if (
        error.code ===
        "auth/invalid-credential"
      ) {

        setError(
          "Invalid email or password"
        );

      } else if (
        error.code ===
        "auth/user-not-found"
      ) {

        setError(
          "Admin account not found"
        );

      } else if (
        error.code ===
        "auth/wrong-password"
      ) {

        setError(
          "Wrong password"
        );

      } else if (
        error.code ===
        "auth/too-many-requests"
      ) {

        setError(
          "Too many attempts. Try again later."
        );

      } else {

        setError(
          "Something went wrong"
        );

      }

    }

    setLoading(false);
  }

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 relative">

      {/* BACK TO WEBSITE */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition"
      >

        <ArrowLeft size={18} />

        Back to Website

      </button>

      {/* LOGIN CARD */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-sm p-8">

        <h1 className="text-3xl font-semibold text-gray-900">

          Admin Login

        </h1>

        <p className="text-sm text-gray-500 mt-2 mb-6">

          Login to manage schools

        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          {/* ERROR */}
          {error && (

            <p className="text-red-500 text-sm">

              {error}

            </p>

          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
          >

            {loading
              ? "Signing in..."
              : "Sign In"}

          </button>

        </form>

      </div>

    </div>
  );
}
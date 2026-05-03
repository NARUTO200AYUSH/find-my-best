"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  Users,
  Building2,
  BookOpen,
  Building,
  Activity,
  Award,
  Home,
  IndianRupee
} from "lucide-react";

import Navbar from "@/components/Navbar";

export default function SchoolPage() {
  const params = useParams();
  const router = useRouter();

  const [school, setSchool] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [added, setAdded] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // HERO SLIDER
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    async function fetchSchool() {
      try {
        const docRef = doc(db, "schools", params.name as string);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const schoolData = {
            id: docSnap.id,
            ...docSnap.data(),
          };

          setSchool(schoolData);

          const existing = JSON.parse(
            localStorage.getItem("compare") || "[]"
          );

          if (existing.includes(schoolData.id)) {
            setAdded(true);
          }
        }

      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }

    fetchSchool();
  }, [params.name]);

  // AUTO IMAGE SLIDER
  useEffect(() => {
    if (!school?.images || school.images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === school.images.length - 1 ? 0 : prev + 1
      );
    }, 3500);

    return () => clearInterval(interval);
  }, [school]);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!school) {
    return <div className="p-10">School not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">

      <Navbar />

      {/* HERO */}
      <div className="relative w-full overflow-hidden">

        <img
          src={
                 school.images &&
                 school.images.length > 0 &&
                 school.images[currentImage]
                 ? school.images[currentImage]
                 : school.image ||
                  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200"
              }
          className="w-full h-[300px] md:h-[400px] object-cover transition-all duration-700"
          alt={school.name}
        />

        <div className="absolute inset-0 bg-black/40"></div>

        {/* BACK */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 bg-white/80 backdrop-blur px-3 py-1.5 rounded-md text-sm text-gray-700 hover:bg-white transition"
        >
          ← Back
        </button>

        {/* ADD TO COMPARE */}
        <button
          onClick={() => {
            const existing = JSON.parse(
              localStorage.getItem("compare") || "[]"
            );

            if (!existing.includes(school.id)) {
              existing.push(school.id);

              localStorage.setItem(
                "compare",
                JSON.stringify(existing)
              );

              window.dispatchEvent(new Event("storage"));
            }

            setAdded(true);
            setShowToast(true);

            setTimeout(() => {
              setShowToast(false);
            }, 2000);
          }}
          className={`absolute top-4 right-4 text-sm font-medium px-4 py-1.5 rounded-lg backdrop-blur transition
          ${
            added
              ? "bg-green-500/90 text-white"
              : "bg-white/40 text-gray-800 hover:bg-blue-100 hover:text-blue-700"
          }`}
        >
          {added ? "✓ Added" : "+ Add to Compare"}
        </button>

        {/* VIEW COMPARISON */}
        {added && (
          <button
            onClick={() => router.push("/compare")}
            className="absolute top-14 right-4 text-sm font-medium text-gray-800 px-4 py-1.5 rounded-lg bg-white/60 backdrop-blur border border-white/40 hover:bg-white/80 transition"
          >
            View Comparison →
          </button>
        )}

        {/* BADGES */}
        <div className="absolute bottom-24 left-10 flex gap-3">

          <span className="bg-white/90 px-2 py-1 rounded text-xs shadow flex items-center gap-1">
            <Star size={12} />
            {school.rating}
          </span>

          <span className="bg-purple-200 text-purple-700 px-2 py-1 rounded text-xs">
            {school.type}
          </span>

        </div>

        {/* TEXT */}
        <div className="absolute bottom-8 left-10 text-white max-w-xl">

          <h1 className="text-2xl md:text-4xl font-semibold">
            {school.name}
          </h1>

          <div className="flex items-center gap-1 text-sm text-gray-200 mt-1">
            <MapPin size={14} />
            {school.location}
          </div>

        </div>
      </div>

      {/* STATS */}
      <div className="max-w-6xl mx-auto px-6 mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <Users className="mx-auto text-blue-600 mb-2" size={18} />
          <p className="text-lg font-bold">{school.students}</p>
          <p className="text-sm text-gray-500">Students</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <Building2 className="mx-auto text-purple-600 mb-2" size={18} />
          <p className="text-lg font-bold">{school.type}</p>
          <p className="text-sm text-gray-500">Type</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <Star className="mx-auto text-yellow-500 mb-2" size={18} />
          <p className="text-lg font-bold">{school.rating}</p>
          <p className="text-sm text-gray-500">Rating</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <MapPin className="mx-auto text-red-500 mb-2" size={18} />
          <p className="text-lg font-bold">{school.location}</p>
          <p className="text-sm text-gray-500">Location</p>
        </div>

      </div>

      {/* ABOUT + FEES */}
      <div className="max-w-6xl mx-auto px-6 mt-6 grid md:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <h2 className="flex items-center gap-2 text-lg font-semibold mb-2">
            <Home size={18} className="text-blue-600" />
            About
          </h2>

          <p className="text-sm text-gray-500 mb-3">
            Classes: {school.classes}
          </p>

          <p className="text-sm text-gray-600 leading-relaxed">
            {school.about}
          </p>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <IndianRupee size={18} className="text-green-600" />
            Fee Structure
          </h2>

          <div className="space-y-3">

            {school.feeDetails?.map((fee: any, i: number) => (
              <div
                key={i}
                className="flex justify-between bg-gray-50 px-4 py-2 rounded-lg items-center"
              >
                <span>{fee.classRange}</span>
                <span className="font-semibold text-right">
                  {fee.amount}
                </span>
              </div>
            ))}

          </div>

        </div>

      </div>

      {/* EXTRA INFO */}
      <div className="max-w-6xl mx-auto px-6 mt-6 grid md:grid-cols-2 gap-6">

        {/* CURRICULUM */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <h2 className="flex items-center gap-2 font-semibold mb-3">
            <BookOpen size={18} className="text-purple-600" />
            Curriculum
          </h2>

          <div className="flex flex-wrap gap-2">

            {school.curriculum?.map((item: string, i: number) => (
              <span
                key={i}
                className="bg-gray-100 px-3 py-1 rounded-md text-sm"
              >
                {item}
              </span>
            ))}

          </div>

        </div>

        {/* FACILITIES */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <h2 className="flex items-center gap-2 font-semibold mb-3">
            <Building size={18} className="text-indigo-600" />
            Facilities
          </h2>

          <ul className="space-y-1 text-sm text-gray-600">

            {Array.isArray(school.facilities) &&
            school.facilities.map((item: string, i: number) => (
           <li key={i}>• {item}</li>
           ))}

         </ul>

        </div>

        {/* ACTIVITIES */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <h2 className="flex items-center gap-2 font-semibold mb-3">
            <Activity size={18} className="text-pink-600" />
            Activities
          </h2>

          <div className="flex flex-wrap gap-2">

            {school.activities?.map((item: string, i: number) => (
              <span
                key={i}
                className="bg-gray-100 px-3 py-1 rounded-md text-sm"
              >
                {item}
              </span>
            ))}

          </div>

        </div>

        {/* ACCREDITATION */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <h2 className="flex items-center gap-2 font-semibold mb-3">
            <Award size={18} className="text-yellow-500" />
            Accreditation
          </h2>

          <ul className="space-y-1 text-sm text-gray-600">

            {school.accreditation?.map((item: string, i: number) => (
              <li key={i}>• {item}</li>
            ))}

          </ul>

        </div>

      </div>

      {/* CONTACT */}
      <div className="max-w-6xl mx-auto px-6 mt-6 mb-10">

        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <h2 className="font-semibold mb-4">
            Contact Information
          </h2>

          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">

            <div>
              <p className="flex items-center gap-1 text-gray-500">
                <Phone size={14} />
                Phone
              </p>

              <p>{school.contact?.phone}</p>
            </div>

            <div>
              <p className="flex items-center gap-1 text-gray-500">
                <Mail size={14} />
                Email
              </p>

              <p>{school.contact?.email}</p>
            </div>

            <div>
              <p className="flex items-center gap-1 text-gray-500">
                <Globe size={14} />
                Website
              </p>

              <p className="text-blue-600">
                {school.contact?.website}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* TOAST */}
      {showToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-2 rounded-lg text-sm shadow border border-gray-200">
          ✓ Added to Compare
        </div>
      )}

    </div>
  );
}
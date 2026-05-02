"use client";

import Link from "next/link";
import { MapPin, Star, Users } from "lucide-react";

interface SchoolCardProps {
  school: any;
}

export default function SchoolCard({ school }: SchoolCardProps) {
  return (
    <Link href={`/school/${school.id}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 cursor-pointer group">

        {/* IMAGE */}
        <div className="relative overflow-hidden">
          <img
            src={
              school.image ||
              "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200"
            }
            alt={school.name}
            className="w-full h-52 object-cover group-hover:scale-105 transition duration-500"
          />

          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-medium shadow">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            {school.rating}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-5">

          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
                {school.name}
              </h2>

              <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                <MapPin size={14} />
                {school.location}
              </div>
            </div>

            <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded-lg whitespace-nowrap">
              {school.type}
            </span>
          </div>

          <p className="text-sm text-gray-600 mt-4 line-clamp-2">
            {school.shortAbout}
          </p>

          <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">

            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Users size={15} />
              {school.students} Students
            </div>

            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View Details →
            </button>

          </div>
        </div>
      </div>
    </Link>
  );
}
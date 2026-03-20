import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";

export default async function SchoolPage({ params }: any) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  const schools = [
    { name: "Green Valley School", location: "Delhi", rating: 4.8, type: "Private" },
    { name: "Riverdale High", location: "Mumbai", rating: 4.6, type: "Public" },
    { name: "Sunrise Academy", location: "Bangalore", rating: 4.5, type: "Charter" },
    { name: "Bright Future School", location: "Delhi", rating: 4.7, type: "Private" },
  ];

  const school = schools.find(
    (s) => s.name.toLowerCase() === decodedName.toLowerCase()
  );

  if (!school) return notFound();

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO IMAGE FULL WIDTH */}
      <div className="relative w-full">

        <img
  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200"
  className="w-full h-[300px] md:h-[400px] object-cover"
/>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* BACK BUTTON */}
        <button className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-md text-sm shadow">
          ← Back
        </button>

        {/* ADD TO COMPARE */}
        <button className="absolute top-4 right-4 bg-white px-3 py-1 rounded-md text-sm shadow">
          Add to Compare
        </button>

        {/* BADGES */}
        <div className="absolute top-16 left-6 flex gap-2">
          <span className="bg-white/90 px-2 py-1 rounded text-xs shadow">
            ⭐ {school.rating}
          </span>
          <span className="bg-purple-200 text-purple-700 px-2 py-1 rounded text-xs">
            {school.type}
          </span>
        </div>

        {/* TEXT */}
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
            {school.name}
          </h1>
          <p className="text-sm text-gray-200 mt-1">
            📍 {school.location}
          </p>
        </div>

      </div>

      {/* STATS */}
      <div className="max-w-6xl mx-auto px-6 mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="bg-white rounded-xl p-4 shadow text-center">
          <p className="text-lg font-bold">800</p>
          <p className="text-sm text-gray-500">Students</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow text-center">
          <p className="text-lg font-bold">8:1</p>
          <p className="text-sm text-gray-500">Student-Teacher</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow text-center">
          <p className="text-lg font-bold">1920</p>
          <p className="text-sm text-gray-500">Established</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow text-center">
          <p className="text-lg font-bold">$25K</p>
          <p className="text-sm text-gray-500">Tuition/Year</p>
        </div>

      </div>

      {/* ABOUT */}
      <div className="max-w-6xl mx-auto px-6 mt-6">
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="font-semibold text-lg mb-2">
            About {school.name}
          </h2>
          <p className="text-gray-600 text-sm">
            An elite private institution offering personalized education with small class sizes.
            We emphasize holistic development through academics and character building.
          </p>
        </div>
      </div>

    </div>
  );
}
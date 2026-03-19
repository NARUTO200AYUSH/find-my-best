export default function SchoolCard({ name, location, rating, type }) {
  return (
<div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition duration-200 w-full">
      {/* Image */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1580582932707-520aed937b7b"
          alt="school"
          className="w-full h-36 object-cover brightness-95"
        />

        {/* Rating badge */}
        <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-md text-xs shadow-sm">
          ⭐ {rating}
        </div>

        {/* Type badge */}
        <div className="absolute top-2 right-2 bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-xs font-medium">
          {type}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">

        <h2 className="text-md font-medium text-gray-800">
          {name}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {location}
        </p>

        <button className="mt-3 w-full bg-blue-600 text-white py-1 rounded-md text-sm hover:bg-blue-700 transition">
          Compare
        </button>

      </div>

    </div>
  );
}
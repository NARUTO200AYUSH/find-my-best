type Props = {
  name: string;
  location: string;
  rating: number;
  type: string;
};

export default function SchoolCard({ name, location, rating, type }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">

      <img
        src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400"
        alt="school"
        className="w-full h-40 object-cover"
      />

      <div className="p-4">

        <div className="flex justify-between items-center mb-2">

          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
            {type}
          </span>

          <span className="text-yellow-500 text-sm">
            ⭐ {rating}
          </span>

        </div>

        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-gray-500 text-sm">{location}</p>

        <div className="mt-3 flex justify-end">
          <button className="bg-blue-500 text-white px-3 py-1 rounded">
            Compare
          </button>
        </div>

      </div>

    </div>
  );
}
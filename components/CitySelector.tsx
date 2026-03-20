type Props = {
  city: string;
  setCity: (value: string) => void;
  count: number;
};

export default function CitySelector({ city, setCity, count }: Props) {
  return (
    <div className="w-full">

      <p className="text-sm text-gray-500 mb-1">
         Select your city
      </p>
      <div className="relative">
  <select
    value={city}
    onChange={(e) => setCity(e.target.value)}
    className="w-full bg-gray-100 px-4 py-3 pr-10 rounded-xl text-sm outline-none appearance-none"
  >
    <option value="All">All Cities</option>
    <option value="Delhi">Delhi</option>
    <option value="Mumbai">Mumbai</option>
    <option value="Bangalore">Bangalore</option>
  </select>

  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
  <svg
  className="w-4 h-4 text-gray-500 transition-transform duration-200"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
  </svg>
</span>
</div>

      <p className="text-sm text-gray-500 mt-3 ml-3">
        {count} schools available
      </p>

    </div>
  );
}
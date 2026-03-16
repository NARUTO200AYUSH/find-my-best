type Props = {
  city: string;
  setCity: (value: string) => void;
  count: number;
};

export default function CitySelector({ city, setCity, count }: Props) {
  return (
    <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-6">

      <p className="text-gray-600 mb-2 font-medium">
        Select Your City
      </p>

      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full bg-gray-100 p-3 rounded-lg border focus:outline-none"
      >
        <option value="All">All Cities</option>
        <option value="Delhi">Delhi</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Bangalore">Bangalore</option>
      </select>

      <p className="text-sm text-gray-500 mt-3">
        {count} schools available
      </p>

    </div>
  );
}
export default function SearchBar({ search, setSearch }) {
  return (
    <div className="w-full">
      <div className="flex w-full overflow-hidden rounded-xl border border-gray-200">

        <input
          type="text"
          placeholder="Search schools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-0 bg-gray-100 px-4 py-3 outline-none text-sm"
        />

        <button className="bg-blue-600 text-white px-5 py-3 text-sm font-medium whitespace-nowrap hover:bg-blue-700 transition">
          Search
        </button>

      </div>
    </div>
  );
}
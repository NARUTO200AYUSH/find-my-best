export default function SearchBar({ search, setSearch }) {
  return (
    <div className="w-full">
      <div className="flex w-full overflow-hidden rounded-lg">

        <input
          type="text"
          placeholder="Search schools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-0 bg-gray-50 px-4 py-2 outline-none"
        />

        <button className="bg-blue-600 text-white px-4 py-2 whitespace-nowrap">
          Search
        </button>

      </div>
    </div>
  );
}
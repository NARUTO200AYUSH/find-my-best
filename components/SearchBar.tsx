type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchBar({ search, setSearch }: Props) {
  return (
    <div className="flex w-full max-w-lg shadow-sm">

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search schools..."
        className="flex-1 border p-3 rounded-l-lg"
      />

      <button className="bg-blue-500 text-white px-6 rounded-r-lg">
        Search
      </button>

    </div>
  );
}
type Props = {
  filter: string;
  setFilter: (value: string) => void;
};

export default function FilterPanel({ filter, setFilter }: Props) {
  const filters = ["All", "Private", "Public", "Charter"];

  return (
    <div className="flex justify-center mt-6">
      <div className="flex gap-3 bg-white shadow rounded-lg px-4 py-3">

        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-3 py-1 rounded-md text-sm transition ${
              filter === item
               ? "bg-blue-500 text-white"
               : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            {item}
          </button>
        ))}

      </div>
    </div>
  );
}
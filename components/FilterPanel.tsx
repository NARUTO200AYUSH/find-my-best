type Props = {
  filter: string;
  setFilter: (value: string) => void;
};

export default function FilterPanel({ filter, setFilter }: Props) {
  const filters = ["All", "Private", "Public", "Charter"];

  return (
    <div className=" mt-4">
      <div className="flex gap-3  px-2 py-2">

        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              filter === item
               ? "bg-blue-500 text-white"
               : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
          >
            {item}
          </button>
        ))}

      </div>
    </div>
  );
}
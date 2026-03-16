export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">

        <h1 className="text-xl font-bold text-black">
          FindMyBest
        </h1>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Compare
        </button>

      </div>
    </nav>
  );
}
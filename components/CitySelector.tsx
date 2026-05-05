"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ChevronDown,
  Search,
} from "lucide-react";

type Props = {
  city: string;
  setCity: (value: string) => void;
  count: number;
  cities: string[];
};

export default function CitySelector({
  city,
  setCity,
  count,
  cities,
}: Props) {

  const [open, setOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  // ================= CLOSE OUTSIDE =================
  useEffect(() => {

    function handleClickOutside(
      event: MouseEvent
    ) {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {

        setOpen(false);

      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  // ================= FILTERED CITIES =================
  const filteredCities =
    cities.filter((cityName) =>
      cityName
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <div className="w-full">

      <p className="text-sm text-gray-500 mb-1">

        Select your city

      </p>

      <div
        ref={dropdownRef}
        className="relative"
      >

        {/* SELECT BUTTON */}
        <button
          onClick={() =>
            setOpen(!open)
          }
          className="w-full bg-gray-100 px-4 py-3 rounded-xl text-sm flex items-center justify-between hover:bg-gray-200 transition"
        >

          <span>

            {city === "All"
              ? "All Cities"
              : city}

          </span>

          <ChevronDown
            size={18}
            className={`text-gray-500 transition-transform duration-200 ${
              open
                ? "rotate-180"
                : ""
            }`}
          />

        </button>

        {/* DROPDOWN */}
        {open && (

          <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-150">

            {/* SEARCH */}
            <div className="p-3 border-b border-gray-100">

              <div className="relative">

                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search city..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  className="w-full bg-gray-100 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:bg-white focus:border focus:border-blue-400"
                />

              </div>

            </div>

            {/* OPTIONS */}
            <div className="max-h-64 overflow-y-auto">

              {/* ALL */}
              <button
                onClick={() => {

                  setCity("All");

                  setOpen(false);

                }}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition ${
                  city === "All"
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700"
                }`}
              >

                All Cities

              </button>

              {/* DYNAMIC CITIES */}
              {filteredCities.map(
                (cityName) => (

                  <button
                    key={cityName}
                    onClick={() => {

                      setCity(
                        cityName
                      );

                      setOpen(false);

                    }}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition ${
                      city === cityName
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700"
                    }`}
                  >

                    {cityName}

                  </button>

                )
              )}

              {/* EMPTY */}
              {filteredCities.length ===
                0 && (

                <div className="px-4 py-4 text-sm text-gray-400 text-center">

                  No city found

                </div>

              )}

            </div>

          </div>

        )}

      </div>

      <p className="text-sm text-gray-500 mt-3 ml-3">

        {count} schools available

      </p>

    </div>

  );

}
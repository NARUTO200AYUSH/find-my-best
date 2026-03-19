"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import CitySelector from "../components/CitySelector";
import SearchBar from "../components/SearchBar";
import SchoolCard from "../components/SchoolCard";
import FilterPanel from "../components/FilterPanel";
import Footer from "../components/Footer";

export default function Home() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");
  const [filter, setFilter] = useState("All");

  const schools = [
    { name: "Green Valley School", location: "Delhi", rating: 4.8, type: "Private", city: "Delhi" },
    { name: "Riverdale High", location: "Mumbai", rating: 4.6, type: "Public", city: "Mumbai" },
    { name: "Sunrise Academy", location: "Bangalore", rating: 4.5, type: "Charter", city: "Bangalore" },
    { name: "Bright Future School", location: "Delhi", rating: 4.7, type: "Private", city: "Delhi" },
  ];

  const filteredSchools = schools.filter((school) => {
    const matchSearch = school.name.toLowerCase().includes(search.toLowerCase());
    const matchCity = city === "All" || school.city === city;
    const matchType = filter === "All" || school.type === filter;
    return matchSearch && matchCity && matchType;
  });

  return (
    <main className="min-h-screen bg-gray-100">

      <Navbar />

      {/* HERO (ONLY TEXT NOW) */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Find the Perfect School
          </h1>

          <p className="mt-4 text-blue-100 max-w-xl">
            Discover and compare the best schools in your city.
          </p>
        </div>
      </section>

      {/* FILTER SECTION (SEPARATE LIKE SAMPLE) */}
      <div className="-mt-10 bg-white py-6 rounded-2xl shadow-lg max-w-6xl mx-auto px-6">
        <div className="max-w-6xl mx-auto px-6 space-y-4">

          <CitySelector
            city={city}
            setCity={setCity}
            count={filteredSchools.length}
          />

          <SearchBar search={search} setSearch={setSearch} />

          <FilterPanel filter={filter} setFilter={setFilter} />

        </div>
      </div>

      {/* CARDS SECTION (FULL WIDTH FEEL) */}
      <div className="max-w-6xl mx-auto px-6">

        <p className="mt-4 text-gray-600">
          Showing {filteredSchools.length} schools
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSchools.map((school, index) => (
            <SchoolCard
              key={index}
              name={school.name}
              location={school.location}
              rating={school.rating}
              type={school.type}
            />
          ))}
        </div>

      </div>

      <Footer />

    </main>
  );
}
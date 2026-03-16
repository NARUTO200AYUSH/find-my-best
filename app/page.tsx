"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import CitySelector from "../components/CitySelector";
import SearchBar from "../components/SearchBar";
import FilterButton from "../components/FilterButton";
import SchoolCard from "../components/SchoolCard";
import FilterPanel from "../components/FilterPanel";
import Hero from "../components/Hero";
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

  const matchSearch = school.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchCity = city === "All" || school.city === city;

  const matchType = filter === "All" || school.type === filter;

  return matchSearch && matchCity && matchType;

});
  return (
    <main className="min-h-screen bg-gray-100">

      <Navbar />

      <Hero />

      <div className="max-w-5xl mx-auto px-6">

        <div className="mt-10 flex justify-center">
          <CitySelector
            city={city}
            setCity={setCity}
            count={filteredSchools.length}
          />
        </div>

        <div className="mt-6 flex justify-center">
          <SearchBar search={search} setSearch={setSearch} />
        </div>

        <div className="mt-4 flex flex-col items-center gap-3">
          <FilterPanel filter={filter} setFilter={setFilter} />
        </div>

        <p className="mt-6 text-gray-600">
          Showing {filteredSchools.length} schools
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
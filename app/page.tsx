"use client";

import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import CitySelector from "../components/CitySelector";
import SearchBar from "../components/SearchBar";
import SchoolCard from "../components/SchoolCard";
import FilterPanel from "../components/FilterPanel";
import Footer from "../components/Footer";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Home() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");
  const [filter, setFilter] = useState("All");

  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSchools() {
      try {
        const querySnapshot = await getDocs(collection(db, "schools"));

        const schoolsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("FIREBASE DATA:", schoolsData);

        setSchools(schoolsData);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }

    fetchSchools();
  }, []);

  const filteredSchools = schools.filter((school) => {
    const matchSearch = school.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchCity =
      city === "All" || school.city === city || school.location === city;

    const matchType =
      filter === "All" || school.type === filter;

    return matchSearch && matchCity && matchType;
  });

  return (
    <main className="min-h-screen bg-gray-100">

      <Navbar />

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12">
        <div className="max-w-5xl mx-auto px-6">

          <h1 className="text-4xl md:text-5xl font-bold">
            Find the Perfect School
          </h1>

          <p className="mt-4 text-blue-100 max-w-2xl">
            Discover and compare the best schools in your city.
          </p>

        </div>
      </section>

      {/* FILTER SECTION */}
      <div className="-mt-10 bg-white py-6 rounded-2xl shadow-lg max-w-6xl mx-auto px-6">

        <div className="max-w-6xl mx-auto px-6 space-y-3">

          <CitySelector
            city={city}
            setCity={setCity}
            count={filteredSchools.length}
          />

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <FilterPanel
            filter={filter}
            setFilter={setFilter}
          />

        </div>
      </div>

      {/* CARDS */}
      <div className="max-w-6xl mx-auto px-6">

        <p className="mt-4 text-gray-600">
          Showing {filteredSchools.length} schools
        </p>

        {loading ? (
          <p className="mt-10 text-center text-gray-500">
            Loading schools...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredSchools.map((school, index) => (
              <SchoolCard
                key={index}
                school={school}
              />
            ))}

          </div>
        )}

      </div>

      <Footer />

    </main>
  );
}
"use client";

import Navbar from "@/components/Navbar";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  BarChart3,
  Star,
  Trophy,
  IndianRupee,
  GraduationCap,
  Building2,
} from "lucide-react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function ComparePage() {

  const [schools, setSchools] =
    useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {

    async function fetchSchools() {

      const compareIds = JSON.parse(
        localStorage.getItem(
          "compare"
        ) || "[]"
      );

      const querySnapshot =
        await getDocs(
          collection(
            db,
            "schools"
          )
        );

      const allSchools: any[] = [];

      querySnapshot.forEach(
        (doc) => {

          allSchools.push({
            id: doc.id,
            ...doc.data(),
          });

        }
      );

      const selected =
        allSchools.filter(
          (school) =>
            compareIds.includes(
              school.id
            )
        );

      setSchools(selected);

    }

    fetchSchools();

  }, []);

  // ================= FEES =================
  const getLastFee = (
    s: any
  ) => {

    if (
      !s?.feeDetails?.length
    ) return 0;

    const last =
      s.feeDetails[
        s.feeDetails.length - 1
      ]?.amount || "0";

    return Number(
      last.replace(
        /[^0-9]/g,
        ""
      )
    );

  };

  // ================= ACADEMICS =================
  const getAcademicScore = (
    s: any
  ) => {

    return (
      (Number(s.rating) || 0) * 10 +
      (s.curriculum?.length || 0) * 5 +
      (s.accreditation?.length || 0) * 6
    );

  };

  // ================= CAMPUS =================
  const getCampusScore = (
    s: any
  ) => {

    return (
      (s.facilities?.length || 0) * 5 +
      (s.activities?.length || 0) * 4
    );

  };

  // ================= OVERALL =================
  const getOverallScore = (
    s: any
  ) => {

    return (
      getAcademicScore(s) +
      getCampusScore(s)
    );

  };

  // ================= WINNERS =================
  const bestAcademicSchool =
    schools.reduce(
      (best, current) =>
        getAcademicScore(current) >
        getAcademicScore(best)
          ? current
          : best,
      schools[0]
    );

  const bestBudgetSchool =
    schools.reduce(
      (best, current) =>
        getLastFee(current) <
        getLastFee(best)
          ? current
          : best,
      schools[0]
    );

  const bestCampusSchool =
    schools.reduce(
      (best, current) =>
        getCampusScore(current) >
        getCampusScore(best)
          ? current
          : best,
      schools[0]
    );

  const bestOverallSchool =
    schools.reduce(
      (best, current) =>
        getOverallScore(current) >
        getOverallScore(best)
          ? current
          : best,
      schools[0]
    );

  return (

    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* TITLE */}
        <div className="mb-8">

          <h1 className="text-3xl font-semibold text-gray-900">

            Compare Schools

          </h1>

          <p className="text-gray-500 text-sm mt-1">

            Smart comparison based on academics, fees, facilities and student experience.

          </p>

        </div>

        {/* EMPTY */}
        {schools.length === 0 ? (

          <div className="flex flex-col items-center justify-center h-[60vh] text-center">

            <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 mb-4">

              <BarChart3 size={22} />

            </div>

            <h2 className="text-lg font-semibold text-gray-900">

              No Schools to Compare

            </h2>

            <p className="text-sm text-gray-500 mt-1 max-w-sm">

              Start adding schools to compare them side by side.

            </p>

            <button
              onClick={() =>
                router.push("/")
              }
              className="mt-5 px-5 py-2 rounded-lg text-white text-sm font-medium bg-blue-600 hover:bg-blue-700 transition"
            >

              Browse Schools

            </button>

          </div>

        ) : (

          <>

            {/* SMART RECOMMENDATIONS */}
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

              {/* ACADEMICS */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">

                <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center mb-4">

                  <GraduationCap
                    size={22}
                    className="text-yellow-600"
                  />

                </div>

                <p className="text-sm text-gray-500">

                  Best Academics

                </p>

                <h2 className="text-lg font-semibold mt-1">

                  {bestAcademicSchool?.name}

                </h2>

                <ul className="mt-3 text-sm text-gray-600 space-y-1">

                  <li>
                    • Highest rating
                  </li>

                  <li>
                    • Strong curriculum
                  </li>

                  <li>
                    • Better accreditation
                  </li>

                </ul>

              </div>

              {/* BUDGET */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">

                <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center mb-4">

                  <IndianRupee
                    size={22}
                    className="text-green-600"
                  />

                </div>

                <p className="text-sm text-gray-500">

                  Best Budget Option

                </p>

                <h2 className="text-lg font-semibold mt-1">

                  {bestBudgetSchool?.name}

                </h2>

                <ul className="mt-3 text-sm text-gray-600 space-y-1">

                  <li>
                    • Lowest fee structure
                  </li>

                  <li>
                    • Better value for money
                  </li>

                  <li>
                    • Affordable choice
                  </li>

                </ul>

              </div>

              {/* CAMPUS */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">

                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">

                  <Building2
                    size={22}
                    className="text-blue-600"
                  />

                </div>

                <p className="text-sm text-gray-500">

                  Best Campus Life

                </p>

                <h2 className="text-lg font-semibold mt-1">

                  {bestCampusSchool?.name}

                </h2>

                <ul className="mt-3 text-sm text-gray-600 space-y-1">

                  <li>
                    • Most facilities
                  </li>

                  <li>
                    • Better activities
                  </li>

                  <li>
                    • Strong student exposure
                  </li>

                </ul>

              </div>

              {/* OVERALL */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-3xl p-5 shadow-sm">

                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">

                  <Trophy
                    size={22}
                    className="text-white"
                  />

                </div>

                <p className="text-sm text-blue-100">

                  Best Overall Choice

                </p>

                <h2 className="text-lg font-semibold mt-1">

                  {bestOverallSchool?.name}

                </h2>

                <ul className="mt-3 text-sm text-blue-100 space-y-1">

                  <li>
                    • Balanced academics
                  </li>

                  <li>
                    • Better facilities
                  </li>

                  <li>
                    • Strong overall profile
                  </li>

                </ul>

              </div>

            </div>

            {/* TABLE */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="border-b">

                  <tr>

                    <th className="p-4 text-left text-gray-400">

                      Feature

                    </th>

                    {schools.map(
                      (
                        school,
                        i
                      ) => (

                        <th
                          key={i}
                          className="p-4 text-left"
                        >

                          <div className="flex items-start justify-between gap-2">

                            <div>

                              <div className="font-semibold text-gray-900">

                                {school.name}

                              </div>

                              <div className="text-xs text-gray-500 mt-1">

                                Overall Score:
                                {" "}
                                {getOverallScore(
                                  school
                                )}

                              </div>

                            </div>

                            <button
                              onClick={() => {

                                const compareIds =
                                  JSON.parse(
                                    localStorage.getItem(
                                      "compare"
                                    ) || "[]"
                                  );

                                const updated =
                                  compareIds.filter(
                                    (
                                      id: string
                                    ) =>
                                      id !==
                                      school.id
                                  );

                                localStorage.setItem(
                                  "compare",
                                  JSON.stringify(
                                    updated
                                  )
                                );

                                setSchools(
                                  (
                                    prev
                                  ) =>
                                    prev.filter(
                                      (
                                        s
                                      ) =>
                                        s.id !==
                                        school.id
                                    )
                                );

                              }}
                              className="text-gray-300 hover:text-red-500 text-lg"
                            >

                              ×

                            </button>

                          </div>

                        </th>

                      )
                    )}

                  </tr>

                </thead>

                <tbody>

                  {[
                    "location",
                    "type",
                    "rating",
                    "students",
                    "classes",
                    "curriculum",
                    "facilities",
                    "activities",
                    "accreditation",
                  ].map(
                    (
                      field,
                      rowIndex
                    ) => (

                      <tr
                        key={rowIndex}
                        className="border-b"
                      >

                        <td className="p-4 text-gray-500 capitalize">

                          {field}

                        </td>

                        {schools.map(
                          (
                            s,
                            i
                          ) => (

                            <td
                              key={i}
                              className="p-4"
                            >

                              {field ===
                              "rating" ? (

                                <span className="flex items-center gap-1">

                                  <Star
                                    size={14}
                                    className="text-yellow-500"
                                  />

                                  {s.rating}

                                </span>

                              ) : field ===
                                  "curriculum" ||
                                field ===
                                  "facilities" ||
                                field ===
                                  "activities" ||
                                field ===
                                  "accreditation" ? (

                                <div className="flex flex-wrap gap-2">

                                  {(s[
                                    field
                                  ] || []).map(
                                    (
                                      item: string,
                                      idx: number
                                    ) => (

                                      <span
                                        key={idx}
                                        className="text-xs bg-gray-100 px-2 py-1 rounded-lg"
                                      >

                                        {item}

                                      </span>

                                    )
                                  )}

                                </div>

                              ) : (

                                s[field]

                              )}

                            </td>

                          )
                        )}

                      </tr>

                    )
                  )}

                  {/* FEES */}
                  <tr className="border-b">

                    <td className="p-4 text-gray-500">

                      Fees

                    </td>

                    {schools.map(
                      (
                        s,
                        i
                      ) => (

                        <td
                          key={i}
                          className="p-4"
                        >

                          <div className="space-y-1">

                            {s.feeDetails?.map(
                              (
                                f: any,
                                idx: number
                              ) => (

                                <div
                                  key={idx}
                                  className="text-xs text-gray-600"
                                >

                                  {f.classRange}
                                  :{" "}

                                  <span className="font-medium">

                                    {f.amount}

                                  </span>

                                </div>

                              )
                            )}

                          </div>

                        </td>

                      )
                    )}

                  </tr>

                  {/* CONTACT */}
                  <tr>

                    <td className="p-4 text-gray-500">

                      Contact

                    </td>

                    {schools.map(
                      (
                        s,
                        i
                      ) => (

                        <td
                          key={i}
                          className="p-4 text-xs"
                        >

                          <div>
                            {s.contact?.phone}
                          </div>

                          <div>
                            {s.contact?.email}
                          </div>

                          <div className="mt-1 text-blue-600">

                            {s.contact?.website}

                          </div>

                        </td>

                      )
                    )}

                  </tr>

                </tbody>

              </table>

            </div>

          </>

        )}

      </div>

    </div>

  );

}
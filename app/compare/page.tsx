"use client";

import Navbar from "@/components/Navbar";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { BarChart3, Star } from "lucide-react";

import {
collection,
getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function ComparePage() {
const [schools, setSchools] = useState<any[]>([]);
const router = useRouter();

useEffect(() => {
async function fetchSchools() {
const compareIds = JSON.parse(
localStorage.getItem("compare") || "[]"
);

  const querySnapshot = await getDocs(collection(db, "schools"));

  const allSchools: any[] = [];

  querySnapshot.forEach((doc) => {
    allSchools.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  const selected = allSchools.filter((school) =>
    compareIds.includes(school.id)
  );

  setSchools(selected);
}

fetchSchools();

}, []);

const maxRating =
schools.length > 0
? Math.max(...schools.map((s) => s.rating))
: 0;

const getLastFee = (s: any) => {
if (!s?.feeDetails?.length) return 0;

const last = s.feeDetails[s.feeDetails.length - 1]?.amount || "0";

return Number(last.replace(/[^0-9]/g, ""));

};

const minFee =
schools.length > 0
? Math.min(...schools.map((s) => getLastFee(s)))
: 0;

const getHighlight = (s: any) => {
if (!s) return "";

if (getLastFee(s) === minFee) {
  return "bg-green-50";
}

if (s.rating === maxRating) {
  return "bg-yellow-50";
}

return "";

};

return (
<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">

  <Navbar />

  <div className="max-w-6xl mx-auto px-6 py-10">

    <div className="mb-8">
      <h1 className="text-3xl font-semibold text-gray-900">
        Compare Schools
      </h1>

      <p className="text-gray-500 text-sm mt-1">
        Side-by-side comparison of selected schools
      </p>
    </div>

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
          onClick={() => router.push("/")}
          className="mt-5 px-5 py-2 rounded-lg text-white text-sm font-medium bg-blue-600 hover:bg-blue-700 transition"
        >
          Browse Schools
        </button>

      </div>

    ) : (

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="border-b">
            <tr>

              <th className="p-4 text-left text-gray-400">
                Feature
              </th>

              {schools.map((school, i) => (

                <th
                  key={i}
                  className={`p-4 text-left ${getHighlight(school)}`}
                >

                  <div className="flex items-start justify-between gap-2">

                    <div className="flex flex-col">

                      <span className="font-semibold text-gray-900">
                        {school.name}
                      </span>

                      {getLastFee(school) === minFee && (
                        <span className="text-xs text-green-600 font-medium">
                          Best Value
                        </span>
                      )}

                      {school.rating === maxRating && (
                        <span className="text-xs text-yellow-600 font-medium">
                          Top Rated
                        </span>
                      )}

                    </div>

                    <button
                      onClick={() => {
                        const compareIds = JSON.parse(
                          localStorage.getItem("compare") || "[]"
                        );

                        const updated = compareIds.filter(
                          (id: string) => id !== school.id
                        );

                        localStorage.setItem(
                          "compare",
                          JSON.stringify(updated)
                        );
                        window.dispatchEvent(new Event ("storage"))
                        setSchools((prev) =>
                          prev.filter((s) => s.id !== school.id)
                        );
                      }}
                      className="text-gray-300 hover:text-red-500 text-base"
                    >
                      ×
                    </button>

                  </div>

                </th>

              ))}

            </tr>
          </thead>

          <tbody>

            {["location", "type", "rating", "students", "classes"].map(
              (field, rowIndex) => (

                <tr key={rowIndex} className="border-b">

                  <td className="p-4 text-gray-500 capitalize">
                    {field}
                  </td>

                  {schools.map((s, i) => (

                    <td
                      key={i}
                      className={`p-4 ${getHighlight(s)}`}
                    >

                      {field === "rating" ? (

                        <span className="flex items-center gap-1">
                          <Star
                            size={14}
                            className="text-yellow-500"
                          />
                          {s.rating}
                        </span>

                      ) : (
                        s[field]
                      )}

                    </td>

                  ))}

                </tr>

              )
            )}

            <tr className="border-b">

              <td className="p-4 text-gray-500">
                Fees
              </td>

              {schools.map((s, i) => (

                <td
                  key={i}
                  className={`p-4 ${getHighlight(s)}`}
                >

                  <div className="space-y-1">

                    {s.feeDetails?.map((f: any, idx: number) => (

                      <div
                        key={idx}
                        className="text-xs text-gray-600"
                      >

                        {f.classRange}:{" "}

                        <span className="font-medium">
                          {f.amount}
                        </span>

                      </div>

                    ))}

                  </div>

                </td>

              ))}

            </tr>

            <tr>

              <td className="p-4 text-gray-500">
                Contact
              </td>

              {schools.map((s, i) => (

                <td
                  key={i}
                  className={`p-4 text-xs ${getHighlight(s)}`}
                >

                  <div>{s.contact?.phone}</div>

                  <div>{s.contact?.email}</div>

                </td>

              ))}

            </tr>

          </tbody>

        </table>

      </div>

    )}

  </div>

</div>

);
}
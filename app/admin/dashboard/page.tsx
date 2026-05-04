"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  onAuthStateChanged,
  signOut,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

import {
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";

export default function DashboardPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [schools, setSchools] =
    useState<any[]>([]);

  const [adminRole, setAdminRole] =
    useState("");

  const [deleting, setDeleting] =
    useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedSchool, setSelectedSchool] =
    useState<any>(null);

  const [adminPassword, setAdminPassword] =
    useState("");

  const [deleteError, setDeleteError] =
    useState("");

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (user) => {

          if (!user) {

            router.replace(
              "/admin/login"
            );

            return;
          }

          try {

            const adminQuery = query(
              collection(db, "admins"),
              where(
                "email",
                "==",
                user.email
              )
            );

            const adminSnapshot =
              await getDocs(adminQuery);

            if (
              adminSnapshot.empty
            ) {

              await signOut(auth);

              router.replace(
                "/admin/login"
              );

              return;
            }

            const adminData =
              adminSnapshot.docs[0].data();

            // ================= SUPER ADMIN =================
            if (
              adminData.role ===
              "super_admin"
            ) {

              setAdminRole(
                "super_admin"
              );

              const snapshot =
                await getDocs(
                  collection(
                    db,
                    "schools"
                  )
                );

              const data =
                snapshot.docs.map(
                  (doc) => ({
                    id: doc.id,
                    ...doc.data(),
                  })
                );

              setSchools(data);

            }

            // ================= SCHOOL ADMIN =================
            else if (
              adminData.role ===
              "school_admin"
            ) {

              setAdminRole(
                "school_admin"
              );

              const schoolQuery =
                query(
                  collection(
                    db,
                    "schools"
                  ),
                  where(
                    "__name__",
                    "==",
                    adminData.schoolId
                  )
                );

              const schoolSnapshot =
                await getDocs(
                  schoolQuery
                );

              const data =
                schoolSnapshot.docs.map(
                  (doc) => ({
                    id: doc.id,
                    ...doc.data(),
                  })
                );

              setSchools(data);

            }

          } catch (error) {

            console.log(error);

          }

          setLoading(false);

        }
      );

    return () => unsubscribe();

  }, [router]);

  // ================= OPEN DELETE MODAL =================
  function openDeleteModal(
    school: any
  ) {

    setSelectedSchool(school);

    setShowDeleteModal(true);

    setAdminPassword("");

    setDeleteError("");

  }

  // ================= DELETE SCHOOL =================
  async function handleDeleteSchool() {

    if (!selectedSchool) return;

    if (!adminPassword) {

      setDeleteError(
        "Enter admin password"
      );

      return;
    }

    try {

      setDeleting(true);

      setDeleteError("");

      const user = auth.currentUser;

      if (!user || !user.email) {

        setDeleteError(
          "Authentication failed"
        );

        return;
      }

      // ================= REAUTHENTICATE =================
      const credential =
        EmailAuthProvider.credential(
          user.email,
          adminPassword
        );

      await reauthenticateWithCredential(
        user,
        credential
      );

      // ================= DELETE SCHOOL =================
      await deleteDoc(
        doc(
          db,
          "schools",
          selectedSchool.id
        )
      );

      // ================= DELETE ADMIN DOC =================
      const adminQuery = query(
        collection(db, "admins"),
        where(
          "schoolId",
          "==",
          selectedSchool.id
        )
      );

      const adminSnapshot =
        await getDocs(
          adminQuery
        );

      for (const adminDoc of adminSnapshot.docs) {

        await deleteDoc(
          doc(
            db,
            "admins",
            adminDoc.id
          )
        );

      }

      // ================= REMOVE FROM UI =================
      setSchools((prev) =>
        prev.filter(
          (item) =>
            item.id !==
            selectedSchool.id
        )
      );

      // CLOSE MODAL
      setShowDeleteModal(false);

      setSelectedSchool(null);

      setAdminPassword("");

    } catch (error: any) {

      console.log(error);

      if (
        error.code ===
        "auth/invalid-credential"
      ) {

        setDeleteError(
          "Wrong admin password"
        );

      } else {

        setDeleteError(
          "Failed to delete school"
        );

      }

    }

    setDeleting(false);

  }

  // ================= LOADING =================
  if (loading) {

    return (
      <div className="p-10">
        Loading dashboard...
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      {/* TOP */}
      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-semibold">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Manage schools here.
          </p>

        </div>

        <div className="flex items-center gap-3">

          {/* ADD SCHOOL */}
          {adminRole ===
            "super_admin" && (

            <button
              onClick={() =>
                router.push(
                  "/admin/create-school"
                )
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition font-medium"
            >

              + Add School

            </button>

          )}

          {/* LOGOUT */}
          <button
            onClick={async () => {

              await signOut(auth);

              router.replace(
                "/admin/login"
              );

            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
          >

            Logout

          </button>

        </div>

      </div>

      {/* SCHOOLS */}
      <div className="grid md:grid-cols-2 gap-6">

        {schools.map((school: any) => (

          <div
            key={school.id}
            className="relative bg-white rounded-3xl p-6 shadow-sm group overflow-hidden"
          >

            {/* DELETE BUTTON */}
            {adminRole ===
              "super_admin" && (

              <button
                onClick={() =>
                  openDeleteModal(
                    school
                  )
                }
                className="absolute top-4 right-4 w-11 h-11 rounded-2xl border border-gray-200 bg-white/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:border-red-200 transition-all duration-300"
              >

                <Trash2
                  size={18}
                  className="text-gray-500 hover:text-red-500"
                />

              </button>

            )}

            <img
             src={
              school.image ||
              "https://placehold.co/600x400?text=No+Image"
              }
              className="w-full h-48 object-cover rounded-2xl mb-4"
            />

            <h2 className="text-xl font-semibold">
              {school.name}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {school.location}
            </p>

            <button
              onClick={() =>
                router.push(
                  `/admin/edit/${school.id}`
                )
              }
              className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
            >

              Edit

            </button>

          </div>

        ))}

      </div>

      {/* ================= DELETE MODAL ================= */}
      {showDeleteModal && (

        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">

          <div className="w-full max-w-md bg-white rounded-3xl p-7 shadow-2xl animate-in fade-in zoom-in duration-200">

            {/* TOP */}
            <div className="flex items-start justify-between">

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">

                  <AlertTriangle
                    className="text-red-500"
                    size={22}
                  />

                </div>

                <div>

                  <h2 className="text-xl font-semibold text-gray-900">
                    Delete School
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    This action cannot be undone.
                  </p>

                </div>

              </div>

              <button
                onClick={() => {

                  setShowDeleteModal(false);

                  setSelectedSchool(null);

                }}
                className="w-9 h-9 rounded-xl hover:bg-gray-100 flex items-center justify-center transition"
              >

                <X
                  size={18}
                  className="text-gray-500"
                />

              </button>

            </div>

            {/* CONTENT */}
            <div className="mt-6">

              <div className="bg-red-50 border border-red-100 rounded-2xl p-4">

                <p className="text-sm text-gray-700 leading-relaxed">

                  You are about to permanently delete:

                </p>

                <p className="font-semibold text-red-600 mt-2">

                  {selectedSchool?.name}

                </p>

              </div>

              {/* PASSWORD */}
              <div className="mt-5">

                <label className="block text-sm font-medium text-gray-700 mb-2">

                  Confirm Admin Password

                </label>

                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) =>
                    setAdminPassword(
                      e.target.value
                    )
                  }
                  placeholder="Enter your password"
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-red-400"
                />

              </div>

              {/* ERROR */}
              {deleteError && (

                <p className="text-sm text-red-500 mt-3">

                  {deleteError}

                </p>

              )}

            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 mt-7">

              <button
                onClick={() => {

                  setShowDeleteModal(false);

                  setSelectedSchool(null);

                }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl font-medium transition"
              >

                Cancel

              </button>

              <button
                onClick={
                  handleDeleteSchool
                }
                disabled={deleting}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-medium transition"
              >

                {deleting
                  ? "Deleting..."
                  : "Delete School"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
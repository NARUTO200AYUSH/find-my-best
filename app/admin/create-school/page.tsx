"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  addDoc,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth, db } from "@/lib/firebase";

import { Trash2 } from "lucide-react";

export default function CreateSchoolPage() {

  const router = useRouter();

  const [saving, setSaving] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [galleryUploading, setGalleryUploading] =
    useState(false);

  const [school, setSchool] =
    useState<any>({

      image: "",

      gallery: [],

      name: "",

      location: "",

      shortAbout: "",

      about: "",

      type: "",

      students: "",

      rating: "",

      classes: "",

      curriculum: [],

      facilities: [],

      activities: [],

      accreditation: [],

      feeDetails: [],

      contact: {
        phone: "",
        email: "",
        website: "",
      },

      adminEmail: "",

      adminPassword: "",

    });

  // ================= THUMBNAIL UPLOAD =================
  async function handleImageUpload(
    e: any
  ) {

    const file = e.target.files[0];

    if (!file) return;

    setUploading(true);

    try {

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      formData.append(
        "upload_preset",
        "findmybest"
      );

      const response =
        await fetch(
          "https://api.cloudinary.com/v1_1/dvyxgefyk/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await response.json();

      if (!data.secure_url) {

        alert(
          "Image upload failed"
        );

        return;
      }

      setSchool((prev: any) => ({
        ...prev,
        image:
          data.secure_url,
      }));

    } catch (error) {

      console.log(error);

      alert(
        "Image upload failed"
      );

    }

    setUploading(false);

  }

  // ================= GALLERY UPLOAD =================
  async function handleGalleryUpload(
    e: any
  ) {

    const file =
      e.target.files[0];

    if (!file) return;

    setGalleryUploading(true);

    try {

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      formData.append(
        "upload_preset",
        "findmybest"
      );

      const response =
        await fetch(
          "https://api.cloudinary.com/v1_1/dvyxgefyk/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await response.json();

      if (!data.secure_url) {

        alert(
          "Gallery upload failed"
        );

        return;
      }

      setSchool((prev: any) => ({
        ...prev,

        gallery: [
          ...(prev.gallery || []),
          data.secure_url,
        ],
      }));

    } catch (error) {

      console.log(error);

      alert(
        "Gallery upload failed"
      );

    }

    setGalleryUploading(false);

  }

  // ================= DELETE GALLERY =================
  function handleDeleteGalleryImage(
    indexToDelete: number
  ) {

    setSchool((prev: any) => ({
      ...prev,

      gallery:
        prev.gallery.filter(
          (
            _: string,
            index: number
          ) =>
            index !==
            indexToDelete
        ),
    }));

  }

  // ================= CREATE SCHOOL =================
  async function handleCreateSchool() {

    setSaving(true);

    try {

      // CREATE SCHOOL DOCUMENT
      const schoolRef =
        await addDoc(
          collection(
            db,
            "schools"
          ),
          {

            image:
              school.image,

            gallery:
              school.gallery || [],

            name:
              school.name,

            location:
              school.location,

            shortAbout:
              school.shortAbout,

            about:
              school.about,

            type:
              school.type,

            students:
              school.students,

            rating:
              school.rating,

            classes:
              school.classes,

            curriculum:
              school.curriculum || [],

            facilities:
              school.facilities || [],

            activities:
              school.activities || [],

            accreditation:
              school.accreditation || [],

            feeDetails:
              school.feeDetails || [],

            contact:
              school.contact || {
                phone: "",
                email: "",
                website: "",
              },

          }
        );

      // CREATE SCHOOL ADMIN AUTH
      await createUserWithEmailAndPassword(
        auth,
        school.adminEmail,
        school.adminPassword
      );

      // CREATE ADMIN DOCUMENT
      await setDoc(
        doc(
          db,
          "admins",
          school.adminEmail
        ),
        {

          email:
            school.adminEmail,

          role:
            "school_admin",

          schoolId:
            schoolRef.id,

        }
      );

      alert(
        "School created successfully"
      );

      router.push(
        "/admin/dashboard"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to create school"
      );

    }

    setSaving(false);

  }

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 shadow-sm">

        {/* TITLE */}
        <div className="mb-10">

          <h1 className="text-3xl font-semibold text-gray-900">
            Create School
          </h1>

          <p className="text-gray-500 mt-2">
            Add a new school and
            create its admin account.
          </p>

        </div>

        <div className="space-y-10">

          {/* THUMBNAIL */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-3">

              Thumbnail Image

            </label>

            <label className="relative block w-full h-80 rounded-3xl overflow-hidden border border-gray-200 bg-gray-100 cursor-pointer group">

              {school.image ? (

                <img
                  src={school.image}
                  className="w-full h-full object-cover"
                />

              ) : (

                <div className="w-full h-full flex items-center justify-center text-gray-400">

                  No image uploaded

                </div>

              )}

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">

                <div className="bg-white text-black px-5 py-2 rounded-xl font-medium">

                  Upload Image

                </div>

              </div>

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleImageUpload
                }
                className="hidden"
              />

            </label>

          </div>

          {/* GALLERY */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-3">

              Gallery Images

            </label>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

              {(school.gallery || []).map(
                (
                  img: string,
                  index: number
                ) => (

                  <div
                    key={index}
                    className="relative h-48 rounded-2xl overflow-hidden border border-gray-200 group"
                  >

                    <img
                      src={img}
                      className="w-full h-full object-cover"
                    />

                    <button
                      onClick={() =>
                        handleDeleteGalleryImage(
                          index
                        )
                      }
                      className="absolute top-3 right-3 w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-200 bg-white/90 hover:border-red-200 hover:bg-red-50 transition"
                    >

                      <Trash2
                        size={18}
                        className="text-gray-500 hover:text-red-500"
                      />

                    </button>

                  </div>

                )
              )}

              <label className="cursor-pointer border-2 border-dashed border-gray-300 rounded-2xl h-48 flex flex-col items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition">

                <span className="text-5xl text-gray-400">
                  +
                </span>

                <span className="text-sm text-gray-500 mt-2">
                  Add Image
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleGalleryUpload
                  }
                  className="hidden"
                />

              </label>

            </div>

          </div>

          {/* BASIC DETAILS */}
          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="School Name"
              value={school.name}
              onChange={(e) =>
                setSchool({
                  ...school,
                  name:
                    e.target.value,
                })
              }
              className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Location"
              value={school.location}
              onChange={(e) =>
                setSchool({
                  ...school,
                  location:
                    e.target.value,
                })
              }
              className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="School Type"
              value={school.type}
              onChange={(e) =>
                setSchool({
                  ...school,
                  type:
                    e.target.value,
                })
              }
              className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Students"
              value={school.students}
              onChange={(e) =>
                setSchool({
                  ...school,
                  students:
                    e.target.value,
                })
              }
              className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Rating"
              value={school.rating}
              onChange={(e) =>
                setSchool({
                  ...school,
                  rating:
                    e.target.value,
                })
              }
              className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Classes"
              value={school.classes}
              onChange={(e) =>
                setSchool({
                  ...school,
                  classes:
                    e.target.value,
                })
              }
              className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>

          {/* ABOUT */}
          <textarea
            rows={3}
            placeholder="Short About"
            value={school.shortAbout}
            onChange={(e) =>
              setSchool({
                ...school,
                shortAbout:
                  e.target.value,
              })
            }
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
          />

          <textarea
            rows={7}
            placeholder="About School"
            value={school.about}
            onChange={(e) =>
              setSchool({
                ...school,
                about:
                  e.target.value,
              })
            }
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
          />

            {/* ================= CURRICULUM ================= */}
        <div>
        
          <label className="block text-sm font-medium text-gray-700 mb-3">
        
            Curriculum
        
          </label>
        
          <div className="space-y-3">
        
            {(school.curriculum || []).map(
              (item: string, index: number) => (
        
                <div
                  key={index}
                  className="flex items-center gap-3"
                >
        
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
        
                      const updated =
                        [...school.curriculum];
        
                      updated[index] =
                        e.target.value;
        
                      setSchool({
                        ...school,
                        curriculum: updated,
                      });
        
                    }}
                    className="flex-1 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
                  />
        
                  <button
                    onClick={() => {
        
                      const updated =
                        school.curriculum.filter(
                          (_: string, i: number) =>
                            i !== index
                        );
        
                      setSchool({
                        ...school,
                        curriculum: updated,
                      });
        
                    }}
                    className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-200 hover:border-red-200 hover:bg-red-50 transition"
                  >
        
                    <Trash2
                      size={18}
                      className="text-gray-500 hover:text-red-500"
                    />
        
                  </button>
        
                </div>
        
              )
            )}
        
            <button
              onClick={() =>
                setSchool({
                  ...school,
                  curriculum: [
                    ...(school.curriculum || []),
                    "",
                  ],
                })
              }
              className="bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-2xl text-sm transition"
            >
        
              + Add Curriculum
        
            </button>
        
          </div>
        
        </div>
        
        {/* ================= FACILITIES ================= */}
        <div>
        
          <label className="block text-sm font-medium text-gray-700 mb-3">
        
            Facilities
        
          </label>
        
          <div className="space-y-3">
        
            {(school.facilities || []).map(
              (item: string, index: number) => (
        
                <div
                  key={index}
                  className="flex items-center gap-3"
                >
        
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
        
                      const updated =
                        [...school.facilities];
        
                      updated[index] =
                        e.target.value;
        
                      setSchool({
                        ...school,
                        facilities: updated,
                      });
        
                    }}
                    className="flex-1 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
                  />
        
                  <button
                    onClick={() => {
        
                      const updated =
                        school.facilities.filter(
                          (_: string, i: number) =>
                            i !== index
                        );
        
                      setSchool({
                        ...school,
                        facilities: updated,
                      });
        
                    }}
                    className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-200 hover:border-red-200 hover:bg-red-50 transition"
                  >
        
                    <Trash2
                      size={18}
                      className="text-gray-500 hover:text-red-500"
                    />
        
                  </button>
        
                </div>
        
              )
            )}
        
            <button
              onClick={() =>
                setSchool({
                  ...school,
                  facilities: [
                    ...(school.facilities || []),
                    "",
                  ],
                })
              }
              className="bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-2xl text-sm transition"
            >
        
              + Add Facility
        
            </button>
        
          </div>
        
        </div>
        
        {/* ================= ACTIVITIES ================= */}
        <div>
        
          <label className="block text-sm font-medium text-gray-700 mb-3">
        
            Activities
        
          </label>
        
          <div className="space-y-3">
        
            {(school.activities || []).map(
              (item: string, index: number) => (
        
                <div
                  key={index}
                  className="flex items-center gap-3"
                >
        
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
        
                      const updated =
                        [...school.activities];
        
                      updated[index] =
                        e.target.value;
        
                      setSchool({
                        ...school,
                        activities: updated,
                      });
        
                    }}
                    className="flex-1 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
                  />
        
                  <button
                    onClick={() => {
        
                      const updated =
                        school.activities.filter(
                          (_: string, i: number) =>
                            i !== index
                        );
        
                      setSchool({
                        ...school,
                        activities: updated,
                      });
        
                    }}
                    className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-200 hover:border-red-200 hover:bg-red-50 transition"
                  >
        
                    <Trash2
                      size={18}
                      className="text-gray-500 hover:text-red-500"
                    />
        
                  </button>
        
                </div>
        
              )
            )}
        
            <button
              onClick={() =>
                setSchool({
                  ...school,
                  activities: [
                    ...(school.activities || []),
                    "",
                  ],
                })
              }
              className="bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-2xl text-sm transition"
            >
        
              + Add Activity
        
            </button>
        
          </div>
        
        </div>
        
        {/* ================= ACCREDITATION ================= */}
        <div>
        
          <label className="block text-sm font-medium text-gray-700 mb-3">
        
            Accreditation
        
          </label>
        
          <div className="space-y-3">
        
            {(school.accreditation || []).map(
              (item: string, index: number) => (
        
                <div
                  key={index}
                  className="flex items-center gap-3"
                >
        
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
        
                      const updated =
                        [...school.accreditation];
        
                      updated[index] =
                        e.target.value;
        
                      setSchool({
                        ...school,
                        accreditation:
                          updated,
                      });
        
                    }}
                    className="flex-1 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
                  />
        
                  <button
                    onClick={() => {
        
                      const updated =
                        school.accreditation.filter(
                          (_: string, i: number) =>
                            i !== index
                        );
        
                      setSchool({
                        ...school,
                        accreditation:
                          updated,
                      });
        
                    }}
                    className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-200 hover:border-red-200 hover:bg-red-50 transition"
                  >
        
                    <Trash2
                      size={18}
                      className="text-gray-500 hover:text-red-500"
                    />
        
                  </button>
        
                </div>
        
              )
            )}
        
            <button
              onClick={() =>
                setSchool({
                  ...school,
                  accreditation: [
                    ...(school.accreditation || []),
                    "",
                  ],
                })
              }
              className="bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-2xl text-sm transition"
            >
        
              + Add Accreditation
        
            </button>
        
          </div>
        
        </div>
        
        
        
        {/* ================= FEE STRUCTURE ================= */}
        <div>
        
          <label className="block text-sm font-medium text-gray-700 mb-3">
        
            Fee Structure
        
          </label>
        
          <div className="space-y-4">
        
            {(school.feeDetails || []).map(
              (fee: any, index: number) => (
        
                <div
                  key={index}
                  className="flex gap-3 items-center"
                >
        
                  {/* CLASS RANGE */}
                  <input
                    type="text"
                    placeholder="Class Range"
                    value={fee.classRange || ""}
                    onChange={(e) => {
        
                      const updated =
                        [...school.feeDetails];
        
                      updated[index].classRange =
                        e.target.value;
        
                      setSchool({
                        ...school,
                        feeDetails: updated,
                      });
        
                    }}
                    className="flex-1 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
                  />
        
                  {/* AMOUNT */}
                  <input
                    type="text"
                    placeholder="Amount"
                    value={fee.amount || ""}
                    onChange={(e) => {
        
                      const updated =
                        [...school.feeDetails];
        
                      updated[index].amount =
                        e.target.value;
        
                      setSchool({
                        ...school,
                        feeDetails: updated,
                      });
        
                    }}
                    className="flex-1 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
                  />
        
                  {/* DELETE */}
                  <button
                    onClick={() => {
        
                      const updated =
                        school.feeDetails.filter(
                          (_: any, i: number) =>
                            i !== index
                        );
        
                      setSchool({
                        ...school,
                        feeDetails: updated,
                      });
        
                    }}
                    className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-200 hover:border-red-200 hover:bg-red-50 transition"
                  >
        
                    <Trash2
                      size={18}
                      className="text-gray-500 hover:text-red-500"
                    />
        
                  </button>
        
                </div>
        
              )
            )}
        
            {/* ADD BUTTON */}
            <button
              onClick={() =>
                setSchool({
                  ...school,
                  feeDetails: [
                    ...(school.feeDetails || []),
                    {
                      classRange: "",
                      amount: "",
                    },
                  ],
                })
              }
              className="bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-2xl text-sm transition"
            >
        
              + Add Fee Structure
        
            </button>
        
          </div>
        
        </div>
        
        {/* ================= CONTACT INFORMATION ================= */}
        <div>
        
          <label className="block text-sm font-medium text-gray-700 mb-4">
        
            Contact Information
        
          </label>
        
          <div className="space-y-4">
        
            {/* PHONE */}
            <input
              type="text"
              placeholder="Phone Number"
              value={school.contact?.phone || ""}
              onChange={(e) =>
                setSchool({
                  ...school,
                  contact: {
                    ...school.contact,
                    phone: e.target.value,
                  },
                })
              }
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
            />
        
            {/* EMAIL */}
            <input
              type="text"
              placeholder="Email"
              value={school.contact?.email || ""}
              onChange={(e) =>
                setSchool({
                  ...school,
                  contact: {
                    ...school.contact,
                    email: e.target.value,
                  },
                })
              }
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
            />
        
            {/* WEBSITE */}
            <input
              type="text"
              placeholder="Website"
              value={school.contact?.website || ""}
              onChange={(e) =>
                setSchool({
                  ...school,
                  contact: {
                    ...school.contact,
                    website: e.target.value,
                  },
                })
              }
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
            />
        
          </div>
        
        </div>
          {/* ADMIN DETAILS */}
          <div className="border-t border-gray-200 pt-10">

            <h2 className="text-xl font-semibold mb-5">
              School Admin Account
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="email"
                placeholder="Admin Email"
                value={school.adminEmail}
                onChange={(e) =>
                  setSchool({
                    ...school,
                    adminEmail:
                      e.target.value,
                  })
                }
                className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
              />

              <input
                type="password"
                placeholder="Admin Password"
                value={school.adminPassword}
                onChange={(e) =>
                  setSchool({
                    ...school,
                    adminPassword:
                      e.target.value,
                  })
                }
                className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
              />

            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-4">

            <button
              onClick={
                handleCreateSchool
              }
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-medium transition"
            >

              {saving
                ? "Creating..."
                : "Create School"}

            </button>

            <button
              onClick={() =>
                router.push(
                  "/admin/dashboard"
                )
              }
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-2xl font-medium transition"
            >

              Cancel

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
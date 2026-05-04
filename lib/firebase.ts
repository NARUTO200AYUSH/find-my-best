// lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCUp0o1WarJXhwAokKlmN-4eWpNoc0XGq8",
  authDomain: "findmybest-8220a.firebaseapp.com",
  projectId: "findmybest-8220a",
  storageBucket: "findmybest-8220a.firebasestorage.app",
  messagingSenderId: "216385696955",
  appId: "1:216385696955:web:6641c62173f3dc8d3d659e",
  measurementId: "G-32P1RLBSX7",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
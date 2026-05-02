// lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUp001WarJXhWAokklmN-4eWpNoc0XGq8",
  authDomain: "findmybest-8220a.firebaseapp.com",
  projectId: "findmybest-8220a",
  storageBucket: "findmybest-8220a.firebasestorage.app",
  messagingSenderId: "216385696955",
  appId: "1:216385696955:web:6641c62173f3dc8d3d659e",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
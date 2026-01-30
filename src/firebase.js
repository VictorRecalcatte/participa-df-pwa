// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAMoahhavKkeJzTAoqgpaEuPv8BNDLJ_F8",
  authDomain: "participa-df-491a2.firebaseapp.com",
  projectId: "participa-df-491a2",
  storageBucket: "participa-df-491a2.firebasestorage.app",
  messagingSenderId: "1086328155759",
  appId: "1:1086328155759:web:bc242e01576ad72352a79a"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Firestore e Storage
export const db = getFirestore(app);
export const storage = getStorage(app);

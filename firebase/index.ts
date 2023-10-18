import { addDoc, collection, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDyhRZA3I_PJNfkCQFNjNDo4wQ7ts2CF3s",
  authDomain: "jobs-4ca4f.firebaseapp.com",
  projectId: "jobs-4ca4f",
  storageBucket: "jobs-4ca4f.appspot.com",
  messagingSenderId: "1059828181243",
  appId: "1:1059828181243:web:cc2614edfb0f779ffee85e",
  measurementId: "G-272BMFG0WR",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();

const colRef = collection(db, "curriculums");

export const addResume = () => {
  addDoc(colRef, {name: 'Alisher'})
};

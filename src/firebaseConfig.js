// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUYxwdbnjS7UT9THK5WHH8lD112Ty6nVc",
  authDomain: "resacadeportiva-3f71b.firebaseapp.com",
  projectId: "resacadeportiva-3f71b",
  storageBucket: "resacadeportiva-3f71b.firebasestorage.app",
  messagingSenderId: "71383981426",
  appId: "1:71383981426:web:59cc01806aa6dc975ed1eb",
  measurementId: "G-N11EFEDKDC"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

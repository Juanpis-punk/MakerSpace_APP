// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4-AmQb8yN7-vUAkoALhQq0rgfIiKRr90",
  authDomain: "makerspaceapp-22322.firebaseapp.com",
  projectId: "makerspaceapp-22322",
  storageBucket: "makerspaceapp-22322.firebasestorage.app",
  messagingSenderId: "1012921672866",
  appId: "1:1012921672866:web:8d331cb7e951517fd6e3fb"

};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
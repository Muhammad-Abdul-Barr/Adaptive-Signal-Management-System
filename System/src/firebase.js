// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Replace these with your Firebase project credentials
const firebaseConfig = {
    apiKey: "AIzaSyBZYY2FygiNCsjYZowXBWphaLi56WWtRMg",
    authDomain: "traffic-management-82968.firebaseapp.com",
    projectId: "traffic-management-82968",
    storageBucket: "traffic-management-82968.firebasestorage.app",
    messagingSenderId: "554313360402",
    appId: "1:554313360402:web:b12b81f05d58e2733664cb",
    measurementId: "G-7BEDZFTYGX"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);

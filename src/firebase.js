// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDEH7xNx3iWWpSImlOgfB6Wm7DTxxr8bKs",
    authDomain: "ysp-germany-website.firebaseapp.com",
    projectId: "ysp-germany-website",
    storageBucket: "ysp-germany-website.firebasestorage.app",
    messagingSenderId: "683060512312",
    appId: "1:683060512312:web:fa4fdc52273d7483b548cd",
    measurementId: "G-C92TRCLSV5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

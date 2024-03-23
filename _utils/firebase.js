// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDds6e4oDQcsv8CRoYf5MiprqnFDZhWCAs",
  authDomain: "fusionflow-project-hub.firebaseapp.com",
  projectId: "fusionflow-project-hub",
  storageBucket: "fusionflow-project-hub.appspot.com",
  messagingSenderId: "363660351086",
  appId: "1:363660351086:web:c1b401ff21e64e7fa4f87f",
  measurementId: "G-651SFF9LWX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleAuth = new GoogleAuthProvider();
const ghAuth = new GithubAuthProvider();
const storage = new getStorage();

export {app, db, auth, googleAuth, ghAuth, storage};
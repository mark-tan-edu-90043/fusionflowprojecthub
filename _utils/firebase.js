// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
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
  measurementId: "G-651SFF9LWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleAuth = new GoogleAuthProvider();
const ghAuth = new GithubAuthProvider();

const handleGoogleAuth = () => {
  console.log('Attempting Google sign-in...');
  signInWithPopup(auth, googleAuth)
  .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    });
}

export {app, db, auth, googleAuth, ghAuth, handleGoogleAuth};
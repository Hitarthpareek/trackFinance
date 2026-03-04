// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsIEhWdrqw6qcOAI8F5yKJ-kcoxGkFWt8",
  authDomain: "fintrack-bacfd.firebaseapp.com",
  projectId: "fintrack-bacfd",
  storageBucket: "fintrack-bacfd.firebasestorage.app",
  messagingSenderId: "684145795103",
  appId: "1:684145795103:web:754d9be5ffba4eb1b1b52a",
  measurementId: "G-613Q9ZQ8QT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore (app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
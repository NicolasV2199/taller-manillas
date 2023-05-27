// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAf8EiMS1Yi5L1yMIwa4atHGumsKA2QMJg",
  authDomain: "bracelets-app.firebaseapp.com",
  projectId: "bracelets-app",
  storageBucket: "bracelets-app.appspot.com",
  messagingSenderId: "347230346715",
  appId: "1:347230346715:web:19c4ae7263be8c5a6fdbfe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};

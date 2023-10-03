// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2n7jABmEzp47RAdRCRpVM_wfTDZ2bCAM",
  authDomain: "cwitter-c136f.firebaseapp.com",
  projectId: "cwitter-c136f",
  storageBucket: "cwitter-c136f.appspot.com",
  messagingSenderId: "1028636568308",
  appId: "1:1028636568308:web:597fdb827617fcbc8fcca1"
};

// Initialize Firebase
const initializeFirebase = initializeApp(firebaseConfig);

export default initializeFirebase;

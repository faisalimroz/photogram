// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDyVn9nXKWOIGd_nGyjfuwuu8vTe1Jeb6o",
  authDomain: "content-cd120.firebaseapp.com",
  projectId: "content-cd120",
  storageBucket: "content-cd120.appspot.com",
  messagingSenderId: "1008532423402",
  appId: "1:1008532423402:web:6377a57f013089cbfccd93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMk2gJT-jUMZJO3p2jfcbIlWTZeQuuJMc",
  authDomain: "svelte-iic3585.firebaseapp.com",
  databaseURL: "https://svelte-iic3585-default-rtdb.firebaseio.com",
  projectId: "svelte-iic3585",
  storageBucket: "svelte-iic3585.appspot.com",
  messagingSenderId: "428307186600",
  appId: "1:428307186600:web:ac01043e31d2f6cd09539d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
/*
export function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}*/
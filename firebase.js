// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPKVxxnV_DIVvRQq3yo_4mUNSkokWundg",
  authDomain: "this-teenage-life.firebaseapp.com",
  projectId: "this-teenage-life",
  storageBucket: "this-teenage-life.appspot.com",
  messagingSenderId: "1057048893100",
  appId: "1:1057048893100:web:76f47435f3f4f0d6e1f109",
  measurementId: "G-T59365HLRK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const analytics = () => {
  if (typeof window !== "undefined") {
    return getAnalytics(app);
  } else {
    return null;
  }
};

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

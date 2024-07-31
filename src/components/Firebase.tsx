
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA9-bgWl07EqDUEZr_1fEiYkEE1IZIO4bQ",
  authDomain: "auth-57b96.firebaseapp.com",
  projectId: "auth-57b96",
  storageBucket: "auth-57b96.appspot.com",
  messagingSenderId: "645208700668",
  appId: "1:645208700668:web:c3c55cfc68bc3b08934979",
  measurementId: "G-W4WGY2DQ44"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD2eMq0wzWR1ja8HvfuRoaRb_n7LFlsNcI",
  authDomain: "areebey-chatapp.firebaseapp.com",
  projectId: "areebey-chatapp",
  storageBucket: "areebey-chatapp.appspot.com",
  messagingSenderId: "422560862173",
  appId: "1:422560862173:web:36e542b6d692f1c7d73034"
};

export const app = initializeApp(firebaseConfig);
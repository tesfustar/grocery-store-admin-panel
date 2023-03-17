import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA9EHcQTEI7trkytYRNa6DqzSNIvIRiKxw",
  authDomain: "grocery-store-bf73d.firebaseapp.com",
  projectId: "grocery-store-bf73d",
  storageBucket: "grocery-store-bf73d.appspot.com",
  messagingSenderId: "286344244997",
  appId: "1:286344244997:web:30a66f80ef8b9ec1ed516c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

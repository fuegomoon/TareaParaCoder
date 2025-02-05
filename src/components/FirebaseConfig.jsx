import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDm16LEJhzjl5kwKmPrCVkBXRM-pH_UR9w",
  authDomain: "tienda-para-coderhouse.firebaseapp.com",
  projectId: "tienda-para-coderhouse",
  storageBucket: "tienda-para-coderhouse.firebasestorage.app",
  messagingSenderId: "319148806203",
  appId: "1:319148806203:web:27e62a7736147d50f64c1e"
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
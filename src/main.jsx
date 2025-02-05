
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
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

export const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
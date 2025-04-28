// src/firebase-config.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDN4l6j22fVHo9chDAccx6yTMk_UukkvUg",
  authDomain: "joyatech-site.firebaseapp.com",
  projectId: "joyatech-site",
  storageBucket: "joyatech-site.firebasestorage.app",
  messagingSenderId: "75999608846",
  appId: "1:75999608846:web:e179ec8f8aefa6844e7c5f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

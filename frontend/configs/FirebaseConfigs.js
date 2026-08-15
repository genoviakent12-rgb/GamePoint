// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSMaWcgF4goYnM65fz-NBSei_kTyZZQhQ",
  authDomain: "game-point-5652c.firebaseapp.com",
  projectId: "game-point-5652c",
  storageBucket: "game-point-5652c.firebasestorage.app",
  messagingSenderId: "112599068149",
  appId: "1:112599068149:web:eb12f7601de0899ef4c4bc",
  measurementId: "G-PE08MKS53C",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with AsyncStorage persistence
let auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  // Auth was already initialized
  auth = getAuth(app);
}

export { auth };

// Initialize Cloud Firestore
export const db = getFirestore(app);
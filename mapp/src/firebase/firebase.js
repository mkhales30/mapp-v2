// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBEDmSAnNc3IKyBXvSGYx1Vkb_1qAANac0",
    authDomain: "mapp-v2.firebaseapp.com",
    projectId: "mapp-v2",
    storageBucket: "mapp-v2.appspot.com",
    messagingSenderId: "588570624491",
    appId: "1:588570624491:web:e88c64db4dd81b5b80d9ae",
    measurementId: "G-Z2WPL5BZZ3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

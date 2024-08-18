// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQcPrr-oez6IADYT2PEz5TwZb1YpwVKF4",
    authDomain: "itemsapp-95914.firebaseapp.com",
    projectId: "itemsapp-95914",
    storageBucket: "itemsapp-95914.appspot.com",
    messagingSenderId: "176787145568",
    appId: "1:176787145568:web:2745e2f12dd416fca29405"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
export{app, firestore}
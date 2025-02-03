import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCJ2S3Bhm3RGPnsmYANVq1X5GwlQBsYiH4",
    authDomain: "miniblog-27cdc.firebaseapp.com",
    projectId: "miniblog-27cdc",
    storageBucket: "miniblog-27cdc.firebasestorage.app",
    messagingSenderId: "157644126164",
    appId: "1:157644126164:web:6f42615bf43ae18bb14841",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };

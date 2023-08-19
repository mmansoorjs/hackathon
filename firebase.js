//  =========cdn import firebase without install ==========
 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import {  getStorage } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
const firebaseConfig = {
    apiKey: "AIzaSyCWlX5JNC6gtx2a-Bgja3HxOiCrEdlGWGU",
    authDomain: "hackathon-project-d6b9f.firebaseapp.com",
    projectId: "hackathon-project-d6b9f",
    storageBucket: "hackathon-project-d6b9f.appspot.com",
    messagingSenderId: "374750011616",
    appId: "1:374750011616:web:fb7ff685aed713f08cb085",
    measurementId: "G-WPXV9YQB54"
  };

 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db = getFirestore(app);
 const storage = getStorage(app);


//  export {app , auth , db , storage}
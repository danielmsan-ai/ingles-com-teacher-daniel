import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAIKlZp6BJ74Pj5WzgLNeJjFKdbKhb27sw",
  authDomain: "english-practice-79174.firebaseapp.com",
  projectId: "english-practice-79174",
  storageBucket: "english-practice-79174.firebasestorage.app",
  messagingSenderId: "1094528950863",
  appId: "1:1094528950863:web:2e5b7467462522d569403a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

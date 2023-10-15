// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPeFrrl9g0m_V4MQ6l2vVB-2KjfTx03Xs",
  authDomain: "taskmanager-f7937.firebaseapp.com",
  projectId: "taskmanager-f7937",
  storageBucket: "taskmanager-f7937.appspot.com",
  messagingSenderId: "1088253011664",
  appId: "1:1088253011664:web:b93dac7cec32e2cd6e20d5",
  measurementId: "G-KLJBH75X9E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
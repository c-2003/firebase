import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCDnP65g0Ychq6_RmYJtaobsWtZdCF-fS4",
    authDomain: "login-auth-8a6c6.firebaseapp.com",
    projectId: "login-auth-8a6c6",
    storageBucket: "login-auth-8a6c6.appspot.com",
    messagingSenderId: "589134159333",
    appId: "1:589134159333:web:f8f175ad40fd6b9c42230c"
  };

// Initialize Firebase
 const app = initializeApp(firebaseConfig);

// help to register user to the firebase console
export const auth = getAuth();

// databbase of app
export const db = getFirestore(app);


export default app
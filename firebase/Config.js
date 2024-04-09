// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, initializeAuth, signInWithEmailAndPassword, updateProfile, createUserWithEmailAndPassword, getReactNativePersistence } from "firebase/auth";
import { snapshot } from "firebase/database";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaWDjP_Zcc1f6ppbDSseeTFCIKfrKfvbY",
  authDomain: "clovergames-6443d.firebaseapp.com",
  projectId: "clovergames-6443d",
  storageBucket: "clovergames-6443d.appspot.com",
  messagingSenderId: "274128948644",
  appId: "1:274128948644:web:e0b2ca67eed6782c680531"
};

// Initialize Firebase
initializeApp(firebaseConfig);

//Instances



// initialize Firebase Auth for that app immediately
const auth = initializeAuth(initializeApp(firebaseConfig), {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

const firestore = getFirestore();

export {
    firestore,
    auth,
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    snapshot,
    collection,
    setDoc,
    getDocs,
    doc,
    getDoc,

   
};
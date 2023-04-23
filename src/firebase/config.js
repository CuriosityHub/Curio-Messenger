import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCCTF51cEEDWgUQXuw_0WH2-JuoR_NLEtk",
    authDomain: "curiomessenger.firebaseapp.com",
    projectId: "curiomessenger",
    storageBucket: "curiomessenger.appspot.com",
    messagingSenderId: "274652251393",
    appId: "1:274652251393:web:b9e0874b820d1082dbc700",
    measurementId: "G-Z68ZH3NEHG"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const firebaseData = getFirestore()
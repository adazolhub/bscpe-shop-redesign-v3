import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
    "apiKey": "AIzaSyDK8IZ-MNspBOOJ_S7k35HbDU2Q92HFiS8",
    "authDomain": "bscpe-store-v2.firebaseapp.com",
    "projectId": "bscpe-store-v2",
    "storageBucket": "bscpe-store-v2.appspot.com",
    "messagingSenderId": "636404332362",
    "appId": "1:636404332362:web:5deaaea62a878ff23633b3",
    "measurementId": "G-5ZCCPZFWLC"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)
export { auth, db }
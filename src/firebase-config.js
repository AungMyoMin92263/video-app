// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: "videoapp-yt-cb892",
    storageBucket: "videoapp-yt-cb892.appspot.com",
    messagingSenderId: "1097852132783",
    appId: "1:1097852132783:web:f45977ee43ad5b3439a35a",
    measurementId: "G-ZXMPXPW7H6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebaseApp
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { onMessage } from 'firebase/messaging';
import { getMessaging } from 'firebase/messaging';
import { getToken } from 'firebase/messaging';


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

const messaging = getMessaging(firebaseApp);


export const getNextKey = () => {
    getToken(messaging, { vapidKey: 'BCQPsMOpHL2KCWb65sn_R0WfTdKUUU8FiBSwYIUxoQGII9s7HEUYVbqplEMF6uwW7Hkb_LxhvGZ281xtu_unkCo' }).then((currentToken) => {
        if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // ...
            console.log(currentToken)

            onMessage(messaging, (payload) => {
                console.log('Message received. ', payload);
                // ...
            })
        } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            // ...
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
    });
}
export default firebaseApp
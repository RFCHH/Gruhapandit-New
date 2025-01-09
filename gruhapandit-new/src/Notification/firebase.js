import axiosInstance from "../axiosInstance";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDiew4fagdg2xog20TQYK5nY9SqLDbsBvU",
authDomain: "gruhapandith.firebaseapp.com",
projectId: "gruhapandith",
storageBucket: "gruhapandith.firebasestorage.app",
messagingSenderId: "60911947807",
appId: "1:60911947807:web:b7e601bb0ac6e40970c52a",
measurementId: "G-D0G125XSZ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const userId = localStorage.getItem('userId');

const generateToken = async () => {
    const permission = await Notification.requestPermission();
    console.log(permission);
    if (permission === 'granted') {
        try {
            const token = await getToken(messaging, {
                vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
            });
            console.log(token);

            if (token) {
                  await axiosInstance.post("/fcm/saveAndUpdateFCMToken", {
                    userId: userId,
                    token: token,
                });
                console.log("FCM token saved successfully");
                console.log("FCM-",token);
                console.log("USR-",userId)
                
            }
        } catch (error) {
            console.error("Error generating or saving the FCM token:", error);
        }
    } else {
        console.warn("Notification permission denied");
    }
};

export { generateToken };
export { messaging };

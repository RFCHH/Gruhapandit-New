// import firebase from 'firebase/app';
// import 'firebase/messaging';    
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "import.meta.env.VITE_APP_API_KEY",
    authDomain: "import.meta.env.VITE_APP_AUTH_DOMAIN",
    projectId: "import.meta.env.VITE_APP_PROJECT_ID",
    storageBucket: "import.meta.env.VITE_APP_STORAGE_BUCKET",
    messagingSenderId: "import.meta.env.VITE_APP_MESSAGING_SENDER_ID",
    appId: "import.meta.env.VITE_APP_APP_ID",
    measurementId: "import.meta.env.VITE_APP_MEASUREMENT_ID",
  
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message:', payload);

    // Customize the notification
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image, 
    };

    // Show the notification
    self.registration.showNotification(notificationTitle, notificationOptions);
});
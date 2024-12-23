import { initializeApp, initializeServerApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {} from "firebase/auth";
import {} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const firebaseServerAppSettings = {
  authIdToken: idToken, // We'll explain how to get the
  // idToken in the service worker
  // example below.
};

// For SSR
const FirebaseServerApp = initializeServerApp(
  firebaseConfig,
  firebaseServerAppSettings
);
console.log(FirebaseServerApp.settings.authIdToken === options.authIdToken); // true

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { exportPages } from "next/dist/export/worker";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(FirebaseApp);
const auth = getAuth(FirebaseApp);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(FirebaseApp);
//const db=app.firestore();

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(FirebaseApp);

export { storage, auth, database };

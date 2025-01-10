import admin from "firebase-admin";
import serviceAccount from "../../config/serviceAccountKey.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      "https://petverse-3fa63-default-rtdb.asia-southeast1.firebasedatabase.app",
  });
}

export { admin };

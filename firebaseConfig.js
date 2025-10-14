import admin from "firebase-admin";
import serviceAccount from "./gezeeats-firebase-adminsdk-8o1wv-d1cc221d22.json" assert { type: "json" };

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Export Firestore instance
export const db = admin.firestore();

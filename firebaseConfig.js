// import admin from "firebase-admin";
// // import serviceAccount from "./gezeeats-firebase-adminsdk-8o1wv-d1cc221d22.json" assert { type: "json" };
// import serviceAccount from "./gezeeats-firebase-adminsdk-8o1wv-73f5fc5d3f.json" with { type: "json" };

// // Initialize Firebase Admin SDK
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// // Export Firestore instance
// export const db = admin.firestore();

import admin from "firebase-admin";

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
import admin from "firebase-admin";
import path from "path";

const serviceAccount= path.resolve(__dirname,"firebase-service-account.json");

admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
    storageBucket: "your-project-id.appspot.com" // <-- replace with your Firebase bucket
}); 

export const bucket = admin.storage().bucket();
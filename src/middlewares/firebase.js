// Setting up the images storages
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('../call-center-719fc-firebase-adminsdk-td2ph-b246a28cc5.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://call-center-719fc.appspot.com', // Set your Firebase Storage bucket here
});
const bucket = admin.storage().bucket(); // Reference to the Firebase storage bucket

module.exports = bucket;
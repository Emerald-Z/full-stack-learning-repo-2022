var admin = require("firebase-admin");
var serviceAccount = require("./cred.json");

// Load Credentials
var { getStorage } = require("firebase-admin/storage");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://demo1026-98550.appspot.com",
});
var bucket = getStorage().bucket();

module.exports = bucket;

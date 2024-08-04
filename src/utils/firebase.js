const admin = require("firebase-admin");
const serviceAccount = require("serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://console.firebase.google.com/u/0/project/peer-project-d936a/database/peer-project-d936a-default-rtdb/data/~2F",
});

const auth = admin.auth();

module.exports = { auth };

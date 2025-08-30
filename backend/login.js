const express = require("express");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize Firestore
const serviceAccount = require("./key.json"); // Path to your Firestore service account key
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const signup = db.collection("signup"); // Firestore collection for signup

const app = express();
app.use(bodyParser.json()); // Middleware for parsing JSON bodies
app.use(cors()); // Enable CORS

const PORT = 3002;

// Login user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email exists in the signup collection
    const snapshot = await signup.where("email", "==", email).get();

    if (snapshot.empty) {
      return res.status(404).json({ error: "Account not found. Please create an account." });
    }

    // Email exists; check if the password matches
    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    if (userData.password === password) {
      return res.status(200).json({ message: "Login successful!" });
    } else {
      return res.status(401).json({ error: "Invalid details. Password does not match." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

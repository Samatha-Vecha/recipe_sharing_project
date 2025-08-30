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
const signup = db.collection("signup"); 

const app = express();
app.use(bodyParser.json()); // Middleware for parsing JSON bodies
app.use(cors()); // Enable CORS

const PORT = 3001;

// Create a new user
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email already exists
    const snapshot = await signup.where("email", "==", email).get();
    if (!snapshot.empty) {
      return res.status(400).json({ error: "Email already exists." });
    }

    // Add new user if email does not exist
    const newUser = { email, password };
    const docRef = await signup.add(newUser);
    res.status(201).json({ id: docRef.id, ...newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// // Update a TODO by ID
// app.put("/todo/:id", (req, res) => {
//   const { id } = req.params;
//   const { title, description } = req.body;
//   const updatedTodo = { title, description, updatedAt: new Date() };

//   todosCollection
//     .doc(id)
//     .update(updatedTodo)
//     .then(() => {
//       res.status(200).json({ id, ...updatedTodo });
//     })
//     .catch((error) => {
//       res.status(500).json({ error: error.message });
//     });
// });

// // Delete a TODO by ID
// app.delete("/todo/:id", (req, res) => {
//   const { id } = req.params;

//   todosCollection
//     .doc(id)
//     .delete()
//     .then(() => {
//       res.status(200).json({ message: "TODO deleted successfully" });
//     })
//     .catch((error) => {
//       res.status(500).json({ error: error.message });
//     });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require("express");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

// Initialize Firebase Admin (Firestore only)
const serviceAccount = require("./key.json"); // Path to Firestore service account key
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const recipes = db.collection("recipes"); // Firestore collection for recipes

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure multer for file uploads (store in memory first)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Endpoint to handle recipe submission
app.post("/addrecipe", upload.single("image"), async (req, res) => {
  const { email, name, ingredients, instructions, category } = req.body;
  const imageFile = req.file;

  // Validate required fields
  if (!email || !name || !ingredients || !instructions || !category) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    let imageUrl = null;
    if (imageFile) {
      // Save the image locally
      const fileName = `${uuidv4()}-${imageFile.originalname}`;
      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, imageFile.buffer);

      // Set image URL as local file path
      imageUrl = `/uploads/${fileName}`;
    }

    // Generate a unique ID for the recipe
    const recipeId = uuidv4();

    // Store the recipe details in Firestore
    const newRecipe = {
      id: recipeId,
      email,
      name,
      ingredients,
      instructions,
      category,
      imageUrl,
      comments: [],
    };

    await recipes.doc(recipeId).set(newRecipe);

    res.status(201).json({ id: recipeId, ...newRecipe });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve static files from uploads folder


// Endpoint to fetch all recipes
app.get("/getrecipes", async (req, res) => {
  try {
    const snapshot = await recipes.get();
    const recipesData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(recipesData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to handle adding a comment
app.post("/addComment", async (req, res) => {
    try {
      const { recipeId, userEmail, comment } = req.body;
  
      // Check if all required fields are present
      if (!recipeId || !userEmail || !comment) {
        return res.status(400).json({ message: "Missing required fields." });
      }
  
      // Check if the recipe exists
      const recipeRef = recipes.doc(recipeId);
      const recipeDoc = await recipeRef.get();
  
      if (!recipeDoc.exists) {
        return res.status(404).json({ message: "Recipe not found." });
      }
  
      const recipe = recipeDoc.data();
  
      // Ensure 'comments' is an array
      const currentComments = recipe.comments || [];
  
      // Add the new comment
      const newComment = { userEmail, comment, timestamp: new Date() };
  
      // Update the recipe with the new comment
      await recipeRef.update({
        comments: [...currentComments, newComment],
      });
  
      res.status(200).json({ success: true });
  
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ error: error.message });
    }
  });
  

// Endpoint to fetch recipes by user email
app.get("/getRecipeByEmail", async (req, res) => {
    const { email } = req.query;
  
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }
  
    try {
      const snapshot = await recipes.where("email", "==", email).get();
      if (snapshot.empty) {
        return res.status(404).json({ message: "No recipes found for this email." });
      }
  
      const recipesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      res.status(200).json(recipesData);
    } catch (error) {
      console.error("Error fetching recipe by email:", error);
      res.status(500).json({ error: error.message });
    }
  });
  

// Serve static files (if needed for serving images from Firebase Storage)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

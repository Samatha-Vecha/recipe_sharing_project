import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import img from "./img.avif"; // Replace with your image file path

const RecipeDisplay = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Retrieve email from sessionStorage
  const email = sessionStorage.getItem("email");

  // Fetch recipes from the API
  useEffect(() => {
    if (!email) {
      alert("You must be logged in to view your recipes.");
      navigate("/login"); // Redirect to login if email is not found
      return;
    }

    fetch("http://localhost:3003/getrecipes", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        // Filter recipes based on email
        const userRecipes = data.filter((recipe) => recipe.email === email);
        setRecipes(userRecipes);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      });
  }, [email, navigate]);

  return (
    <div
      className="min-vh-100"
      style={{
        backgroundImage: `url(${img})`, // Use the imported image as the background
        backgroundSize: "cover", // Ensure the image covers the entire background
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Prevent the image from repeating
      }}
    >
     <nav
  className="navbar navbar-expand-lg shadow-lg"
  style={{
    padding: "15px 0",
   
  }}
>
  <div className="container-fluid">
    <p
      className="navbar-brand"
      href="#"
      style={{
        fontFamily: "'Pacifico', cursive",
        fontSize: "2.5rem",
        textTransform: "uppercase", // Makes the text uppercase
        letterSpacing: "2px", // Adds spacing between letters for better effect
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)", // Adds the shadow for a double-layered effec
      }}
    >
      Recipe Hub
    </p>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" ></span> {/* Change toggle icon color to white */}
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <button
            className="nav-link active"
            onClick={() => navigate("/profile")}
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              
            }}
          >
            View Profile
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link active"
            onClick={() => navigate("/addrecipe")}
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
             
            }}
          >
            Add Recipe
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link active"
            onClick={() => navigate("/yourrecipes")}
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
            
            }}
          >
            View Your Recipes
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link active"
            onClick={() => navigate("/allrecipes")} // New route for viewing all recipes
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
           
            }}
          >
            View All Recipes
          </button>
        </li>
      </ul>
    </div>
  </div>
</nav>


      {/* Recipes Display Section */}
      <div className="container mt-5">
            <h2 className="text-center mb-4 fw-bold"
                style={{
                  backgroundImage: "linear-gradient(to right, darkorange, darkgreen)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>Your Recipes</h2>
        <div className="row">
          {loading ? (
            <p className="text-center text-dark">Loading recipes...</p>
          ) : recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div className="col-md-4 mb-4" key={recipe.id}>
                <div className="card shadow-sm">
                  {/* Recipe Image at the top of the card */}
                  {recipe.imageUrl && (
                 <img
                  src={`http://localhost:3003${recipe.imageUrl}`} 
                  alt={recipe.name}
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "cover" }}
                  onError={(e) => { e.target.src = "https://via.placeholder.com/250"; }} // Fallback image
                />)}

                  {/* Recipe Details Below the Image */}
                  <div className="card-body">
                    <h5 className="card-title">{recipe.name}</h5>
                    <p className="card-text"><strong>Category:</strong> {recipe.category}</p>
                    <p className="card-text"><strong>Ingredients:</strong> {recipe.ingredients || "No ingredients listed"}</p>
                    <p className="card-text"><strong>Instructions:</strong> {recipe.instructions || "No instructions available"}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-dark">No recipes found for this user.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;

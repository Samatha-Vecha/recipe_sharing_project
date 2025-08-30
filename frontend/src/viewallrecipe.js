import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import img from "./img.avif"; // Replace with your image file path

const AllRecipeDisplay = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [showComments, setShowComments] = useState({}); // To manage which recipe's comments to show
  const navigate = useNavigate();

  // Fetch recipes from the API
  useEffect(() => {
    fetch("http://localhost:3003/getrecipes", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      });
  }, []);

  const handleAddComment = async (recipeId) => {
    if (comment.trim() === "") {
      alert("Please enter a comment.");
      return;
    }
  
    const userEmail = sessionStorage.getItem('email');
    if (!userEmail) {
      alert("User is not logged in.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3003/addComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeId, userEmail, comment }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        if (Array.isArray(data)) {
          const recipe = data.find((r) => r.email === userEmail);
  
          if (recipe) {
            // Update the state optimistically with the new comment
            setRecipes((prevRecipes) =>
              prevRecipes.map((recipe) =>
                recipe.id === recipeId
                  ? { ...recipe, comments: [...(recipe.comments || []), { userEmail, comment }] }
                  : recipe
              )
            );
          } else {
            alert("No recipe found for the given email.");
          }
        }
        setComment(''); // Clear comment input
        alert("Comment posted!");
  
        // Re-fetch the recipes to ensure the comment persists after page refresh
        fetchRecipes();
      } else {
        alert(data.message || "Failed to add comment.");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Error posting comment.");
    }
  };
  
  // Re-fetch the recipes after posting the comment
  const fetchRecipes = () => {
    fetch("http://localhost:3003/getrecipes", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);  // Update the recipes with the latest data
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  };
  

  const toggleComments = (recipeId) => {
    setShowComments((prevShowComments) => ({
      ...prevShowComments,
      [recipeId]: !prevShowComments[recipeId], // Toggle visibility for the clicked recipe
    }));
  };

  return (
    <div
      className="min-vh-100"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
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
        <h2
          className="text-center mb-4 fw-bold"
          style={{
            backgroundImage: "linear-gradient(to right, darkorange, darkgreen)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          All Recipes
        </h2>
        <div className="row">
          {loading ? (
            <p className="text-center text-dark">Loading recipes...</p>
          ) : recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div className="col-md-4 mb-4" key={recipe.id}>
                <div className="card shadow-sm">
                  {recipe.imageUrl && (
                    <img
                      src={`http://localhost:3003${recipe.imageUrl}`} 
                      alt={recipe.name}
                      className="card-img-top"
                      style={{ height: "250px", objectFit: "cover" }}
                      onError={(e) => { e.target.src = "https://via.placeholder.com/250"; }} // Fallback image
                    />)}
                  <div className="card-body">
                    <h5 className="card-title">{recipe.name}</h5>
                    <p className="card-text">
                      <strong>Category:</strong> {recipe.category}
                    </p>
                    <p className="card-text">
                      <strong>Ingredients:</strong> {recipe.ingredients || "No ingredients listed"}
                    </p>
                    <p className="card-text">
                      <strong>Instructions:</strong> {recipe.instructions || "No instructions available"}
                    </p>
                    <p className="card-text">
                      <strong>Email:</strong> {recipe.email || "No email listed"}
                    </p>

                    {/* Toggle Button for Comments */}
                    <button
                      className="btn btn-outline-primary mt-2"
                      onClick={() => toggleComments(recipe.id)}
                    >
                      {showComments[recipe.id] ? "Hide Comments" : "Show Comments"}
                    </button>

                    {/* Display Comments if Show Comments is toggled */}
                    {showComments[recipe.id] && (
                      <div className="mt-4">
                        <h6>Comments:</h6>
                        <ul className="list-group">
                          {recipe.comments &&
                            recipe.comments.map((comment, index) => (
                              <li key={index} className="list-group-item">
                                <strong>{comment.userEmail}:</strong> {comment.comment}
                              </li>
                            ))}
                        </ul>

                        <div className="mt-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Add a comment..."
                            value={comment} // Directly bind it to the comment state
                            onChange={(e) => setComment(e.target.value)} // Update the comment state on typing
                          />

                          <button
                            className="btn btn-outline-primary mt-2"
                            onClick={() => {
                              setSelectedRecipeId(recipe.id);
                              handleAddComment(recipe.id);
                            }}
                          >
                            Post Comment
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-dark">No recipes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllRecipeDisplay;

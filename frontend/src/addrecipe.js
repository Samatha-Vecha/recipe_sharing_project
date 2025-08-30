import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import img from "./img.avif"; // Replace with your image path

const RecipeForm = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setRecipe((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Retrieve email from sessionStorage
    const email = sessionStorage.getItem("email"); // Replace "email" with the correct key if necessary
    
    // Check if email is available
    if (!email) {
      alert("Email is required!");
      return;
    }
  
    const formData = new FormData();
    formData.append("email", email);  // Add email to the form data
    formData.append("name", recipe.name);
    formData.append("ingredients", recipe.ingredients);
    formData.append("instructions", recipe.instructions);
    formData.append("category", recipe.category);
    if (recipe.image) {
      formData.append("image", recipe.image);
    }
  
    // Send the data to the API running on port 3003
    fetch("http://localhost:3003/addrecipe", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Recipe uploaded successfully!");
        console.log(data);
        navigate("/allrecipes");
      })
      .catch((error) => {
        console.error("Error uploading recipe:", error);
      });
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
      {/* Navbar Section */}
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


      {/* Recipe Form Section */}
      <div className="container" style={{ marginTop: "40px" }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div
              className="card shadow-lg"
              style={{
                background: "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(10px)",
                padding: "20px",
              }}
            >
              <div className="card-body">
              <h2
                    className="text-center mb-4 fw-bold"
                    style={{
                        backgroundImage: "linear-gradient(to right, darkorange, darkgreen)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                    >
                    Add New Recipe
                    </h2>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Recipe Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      value={recipe.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="ingredients" className="form-label">
                      Ingredients:
                    </label>
                    <textarea
                      id="ingredients"
                      name="ingredients"
                      className="form-control"
                      rows="3"
                      value={recipe.ingredients}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="instructions" className="form-label">
                      Instructions:
                    </label>
                    <textarea
                      id="instructions"
                      name="instructions"
                      className="form-control"
                      rows="3"
                      value={recipe.instructions}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      Category:
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="form-select"
                      value={recipe.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="Appetizer">Appetizer</option>
                      <option value="Main Course">Main Course</option>
                      <option value="Dessert">Dessert</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Recipe Image:
                    </label>
                    <input
                      type="file"
                      id="image"
                      className="form-control"
                      onChange={handleImageChange}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                        <button
                            type="submit"
                            className="btn"
                            style={{
                            backgroundColor: "green",
                            color: "white",
                            fontWeight: "bold",
                            padding: "10px 20px",
                            }}
                        >
                            Submit Recipe
                        </button>
                        </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import img from "./img.avif"; // Replace with your image file path

function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user data from sessionStorage or any API (mocked here for simplicity)
  useEffect(() => {
    const email = sessionStorage.getItem("email");
    const password = sessionStorage.getItem("password");

    if (email && password) {
      setUser({
        email,
        password,
        name: "User Name (from sessionStorage)", // Placeholder name
      });
    } else {
      console.error("No user data in sessionStorage");
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Display a loading message until the data is fetched
  }

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

      {/* Profile Card Section */}
      <div className="container" style={{ marginTop: "80px" }}> {/* Adjust the margin-top here */}
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div
              className="card shadow-lg"
              style={{
                background: "rgba(255, 255, 255, 0.6)", // Semi-transparent background
                backdropFilter: "blur(10px)", // Frosted glass effect (blurring the background)
                padding: "20px", // Add some padding inside the card
              }}
            >
              <div className="card-body">
                <h2 className="text-center mb-4 fw-bold text-primary">Your Profile</h2>
                <div className="mb-4">
                  <p>
                    <strong>Email: </strong> {user.email}
                  </p>
                  <p>
                    <strong>Password: </strong> {user.password}
                  </p>
                </div>
                <div className="d-grid gap-3">
                  <button
                    type="button"
                    className="btn btn-link text-danger text-decoration-none"
                    onClick={() => {
                      sessionStorage.clear();
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

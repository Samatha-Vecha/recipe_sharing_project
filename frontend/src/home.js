import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { useNavigate } from "react-router-dom";
import img from "./homeimg.webp";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url(${img})`, // Use the imported image as the background
        backgroundSize: "cover", // Ensure the image covers the entire background
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Prevent the image from repeating
        minHeight: "100vh", // Ensure the background covers the full viewport height
        display: "flex", // Enable flexbox for centering
        flexDirection: "column", // Stack elements vertically
      }}
    >
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg shadow-sm"
        style={{
          background: "linear-gradient(to right, #f46b45, #eea849)", // Gradient background
          padding: "1.5rem", // Increased padding for a larger navbar
        }}
      >
        <div className="container-fluid">
          <h1
            className="text-white text-center mb-0"
            style={{
              fontFamily: "'Pacifico', cursive", // Cursive font
              fontSize: "2.5rem", // Larger font size
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)", // Dark shadow for contrast
            }}
          >
            Recipe Hub
          </h1>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button
                  className="btn btn-light me-3"
                  style={{
                    fontSize: "1rem", // Larger button text
                    fontWeight: "bold",
                    border: "2px solid #fff", // Border for better definition
                  }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-light"
                  style={{
                    fontSize: "1rem", // Larger button text
                    fontWeight: "bold",
                    border: "2px solid #fff", // Border for better definition
                  }}
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div
        className="d-flex flex-column align-items-center justify-content-center flex-grow-1"
      >
        <h1
          className="text-warning text-center mb-4"
          style={{
            fontFamily: "'Pacifico', cursive",
            fontSize: "5rem", // Adjusted font size for a balanced look
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)", // Darker shadow
            marginTop: "-100px", // Move the heading up
          }}
        >
          Welcome to Recipe World
        </h1>
        <p
          className="text-black text-center"
          style={{
            fontSize: "1.5rem", // Increased font size for better readability
            maxWidth: "600px",
            color: "black", // Text color changed to black
          }}
        >
          Discover and share your favorite recipes. Cook up something extraordinary today!
        </p>
      </div>

    </div>
  );
}

export default Home;

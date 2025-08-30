import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import img from "./img.avif"; // Replace with your image file path
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = { email, password };

    fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (response.ok) {
          // Signup successful
          return response.json();
        } else {
          // Handle error responses
          return response.json().then((error) => {
            throw new Error(error.error || "Something went wrong.");
          });
        }
      })
      .then((data) => {
        console.log("Signup successful:", data);

        // Store email and password in sessionStorage
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("password", password);

        // Redirect to the welcome page
        navigate("/allrecipes");
      })
      .catch((error) => {
        console.error("Error during signup:", error.message);
        alert(`Signup failed: ${error.message}`);
      });
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${img})`, // Use the imported image as the background
        backgroundSize: "cover", // Ensure the image covers the entire background
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Prevent the image from repeating
      }}
    >
      {/* Title Section */}
      <h1
        className="text-dark text-center mb-4"
        style={{
          fontFamily: "'Pacifico', cursive",
          fontSize: "3rem", // Adjusted font size for a balanced look
          textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)", // Darker shadow
        }}
      >
        Recipe Hub
      </h1>

      {/* Signup Card */}
      <div
        className="card shadow-lg border-0 rounded-4"
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "rgba(255, 255, 255, 0.85)", // Make the container transparent
          backdropFilter: "blur(10px)", // Add blur effect for a frosted glass look
        }}
      >
        <div className="card-body p-5">
          <h2 className="text-center mb-4 fw-bold text-primary">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label text-secondary">
                Email address
              </label>
              <input
                type="email"
                className="form-control form-control-lg rounded-3"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label text-secondary">
                Password
              </label>
              <input
                type="password"
                className="form-control form-control-lg rounded-3"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-grid gap-3">
              <button
                type="submit"
                className="btn btn-lg rounded-3"
                style={{
                  background: "linear-gradient(to right, #6a11cb, #2575fc", // Gradient button
                  color: "#fff",
                  border: "none",
                }}
              >
                Create account
              </button>
              <button
                type="button"
                className="btn btn-link text-secondary text-decoration-none"
                onClick={() => navigate("/login")}
              >
                Already have an account?
                <span style={{ fontWeight: "bold", color: "#007bff" }}> Login</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;

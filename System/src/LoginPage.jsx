import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Ensure to create a corresponding CSS file for styles

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending a POST request to the backend to verify the user
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.role === "admin") {
          navigate("/admin/landingpage");
        } else if (data.role === "station") {
          navigate("/station/landingpage");
        }
      } else {
        alert(data.message || "Invalid username or password");
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-page">
      <div className="left-section">
        <h1>ADAPTIVE TRAFFIC MANAGEMENT SYSTEM</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">
              <span className="icon">👤</span>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div className="input-group">
            <label htmlFor="password">
              <span className="icon">🔒</span>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
      <div className="right-section">
        <div className="info-card">
          <p>
            An AI Based Solution to Traffic Congestion at Signal Intersections
            Using Computer Vision
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

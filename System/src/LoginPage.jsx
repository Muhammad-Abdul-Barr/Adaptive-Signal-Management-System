import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Ensure to create a corresponding CSS file for styles

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "station", password: "station123", role: "station" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      if (foundUser.role === "admin") {
        navigate("/admin/landingpage");
      } else if (foundUser.role === "user") {
        navigate("/station/landingpage");
      }
    } else {
      alert("Invalid username or password");
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

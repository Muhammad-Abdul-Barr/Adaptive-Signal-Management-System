import React from "react";
import "./StationDashboard.css"; // Ensure to create a corresponding CSS file for styles

const StationPage = () => {
  const imageUrl =
    "https://example.com/static-image.jpg"; // Replace this URL with your desired image.

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Landing Page Admin</h1>
      </header>
      <aside className="admin-sidebar">
        <h2>Adaptive Traffic Management System</h2>
        <ul>
          <li>Configure Intersections</li>
          <li>View Logs</li>
          <li>Account Setting</li>
        </ul>
      </aside>
      <main className="admin-main">
        <h2>ADMIN MODE</h2>
        <div className="admin-image-container">
          <img
            src={imageUrl}
            alt="Traffic Intersection"
            className="admin-image"
          />
        </div>
      </main>
      <div className="admin-notification">
        <span className="notification-badge">15</span>
        <p>Pixelz Warriors</p>
      </div>
    </div>
  );
};

export default StationPage;

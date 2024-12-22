import React from "react";
import { useState } from "react";
import { navigate } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import pfp from "D:/Study/5th Semester/AI/Theory/trafficproject/System/src/pfp.png"; // Path to your profile picture

const StationSidebar = () => {
  const navigate = useNavigate(); // Correct way to initialize navigate
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <div className="flex h-screen z-1000">
      {/* Sidebar */}
      <div className="flex flex-col w-64 bg-white shadow-lg px-6 py-4 fixed left-0 top-0 h-full">
        <h1 className="text-lg font-bold mb-8 text-gray-800">Adaptive Signal Management System</h1>
        <nav className="flex flex-col gap-4">
          <NavLink
            to="/Station/configure-intersection"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md ${
                isActive ? "bg-gray-200" : "hover:bg-gray-100"
              }`
            }
          >
            ⚙️ Configure Signals
          </NavLink>
          <NavLink
            to="/Station/moniter-signal"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md ${
                isActive ? "bg-gray-200" : "hover:bg-gray-100"
              }`
            }
          >
            📍 Moniter Signal
          </NavLink>
          <NavLink
            to="/Station/account-settings"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md ${
                isActive ? "bg-gray-200" : "hover:bg-gray-100"
              }`
            }
          >
            ⚙️ Account Settings
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-50 ml-64">
        {/* Header */}
        <div className="flex justify-between items-center p-6 fixed top-0 left-64 right-0 bg-gray-50 shadow-md z-10">
          <h1 className="text-2xl font-bold text-gray-800">Station Mode</h1>
          <div className="flex items-center gap-6">
            
            {/* Profile */}
            <div className="relative">
              <button
                onClick={handleProfileClick}
                className="flex items-center gap-2"
              >
                <img
                  src= {pfp}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-gray-700">Pixel Warriors</span>
              </button>
              {showProfileMenu && (
                <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md p-4 w-48 z-10">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => navigate("/")}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Rest of the main content */}
        <div className="flex-1 bg-white mt-24">
          {/* Your main content goes here */}
        </div>
      </div>
    </div>
  );
};

export default StationSidebar;

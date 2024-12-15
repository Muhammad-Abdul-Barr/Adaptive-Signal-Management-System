import React from "react";
import { NavLink } from "react-router-dom";

const StationSidebar = () => {
  return (
    <div className="flex flex-col h-screen w-64 bg-white shadow-lg px-6 py-4">
      <h1 className="text-lg font-bold mb-8 text-gray-800">Station Dashboard</h1>
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/station/configure-intersection"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md ${
              isActive ? "bg-gray-200" : "hover:bg-gray-100"
            }`
          }
        >
          ⚙️ Configure Intersection
        </NavLink>
        <NavLink
          to="/view-logs/viewsignallogs"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md ${
              isActive ? "bg-gray-200" : "hover:bg-gray-100"
            }`
          }
        >
          📄 View Signal Logs
        </NavLink>
        <NavLink
          to="/station/account-settings"
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
  );
};

export default StationSidebar;

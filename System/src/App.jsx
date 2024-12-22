import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import AdminSidebar from "./components/AdminSidebar";
import StationSidebar from "./components/StationSidebar";

import AdminConfigureSignals from "./pages/admin/AdminConfigureSignals";
import AdminConfigureStations from "./pages/admin/AdminConfigureStation";
import AdminViewLogs from "./pages/admin/AdminViewlogs";
import AdminAccSettings from "./pages/admin/AdminAccSettings";

import AddNewSignal from "./pages/admin/Signals/AddNewSignal";
import EditSignal from "./pages/admin/Signals/EditSignal";
import DeleteSignal from "./pages/admin/Signals/DeleteSignal";

import AddNewStation from "./pages/admin/Station/AddNewStation";
import EditStation from "./pages/admin/Station/EditStation";
import DeleteStation from "./pages/admin/Station/DeleteStation";
import AssignIntersection from "./pages/admin/Station/AssignIntersection";

import StationConfigureIntersection from "./pages/station/StationConfigureIntersection";
import LiveFeed from "./pages/station/ConfigureSignal/LiveFeeds";
import SetArea from "./pages/station/ConfigureSignal/SetArea";
import VerifyCamera from "./pages/station/ConfigureSignal/Verifypoints"
import StationOverride from "./pages/station/ConfigureSignal/Override";
import MoniterSignal from "./pages/station/MoniterSignal";
import WatchSignal from "./pages/station/WatchSignal";

import StationAccSettings from "./pages/station/StationAccSettings";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/admin/*"
          element={
            isLoggedIn ? (
              <div className="flex">
                <AdminSidebar />
                <div className="flex-1 bg-gray-50 p-4">
                  <Routes>
                    <Route path="configure-signals" element={<AdminConfigureSignals />} />
                    <Route path="configure-signals/add-signal" element={<AddNewSignal />} />
                    <Route path="configure-signals/update-signal" element={<EditSignal />} />
                    <Route path="configure-signals/delete-signal" element={<DeleteSignal />} />
                    <Route path="configure-stations" element={<AdminConfigureStations />} />
                    <Route path="configure-stations/add-station" element={<AddNewStation />} />
                    <Route path="configure-stations/update-station" element={<EditStation />} />
                    <Route path="configure-stations/delete-station" element={<DeleteStation />} />
                    <Route path="configure-stations/assign-intersection" element={<AssignIntersection />} />
                    <Route path="account-settings" element={<AdminAccSettings />} />
                  </Routes>
                </div>
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/station/*"
          element={
            isLoggedIn ? (
              <div className="flex">
                <StationSidebar />
                <div className="flex-1 bg-gray-50 p-4">
                  <Routes>
                    <Route path="configure-intersection" element={<StationConfigureIntersection />} />
                    <Route path="configure-intersection/live-feeds" element={<LiveFeed />} />
                    <Route path="configure-intersection/live-feeds/set-area" element={<SetArea />} />
                    <Route path="configure-intersection/live-feeds/set-area/verifycamera" element={<VerifyCamera />} />
                    <Route path="override" element={<StationOverride />} />
                    <Route path="moniter-signal" element = {<MoniterSignal />} />
                    <Route path="moniter-signal/watch-signal" element = {<WatchSignal />} />
                    <Route path="account-settings" element={<StationAccSettings />} />
                  </Routes>
                </div>
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

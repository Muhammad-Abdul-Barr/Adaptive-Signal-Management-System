import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import custom marker image
import customMarkerImage from "D:/Study/5th Semester/AI/Theory/trafficproject/System/src/marker.png"; 

// Define custom marker icon
const customIcon = L.icon({
  iconUrl: customMarkerImage,
  iconSize: [40, 40], // Adjust the size as needed
  iconAnchor: [20, 40], // Anchor point to center the icon
  popupAnchor: [0, -40], // Position of the popup
});

// Fix marker icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const AssignIntersection = () => {
  // Initial List of Stations
  const [stations] = useState([
    { id: 1, name: "Station Name 1", cnic: "12345-6789012-3" },
    { id: 2, name: "Station Name 2", cnic: "12345-6789012-4" },
    { id: 3, name: "Station Name 3", cnic: "12345-6789012-5" },
    { id: 4, name: "Station Name 4", cnic: "12345-6789012-6" },
  ]);

  // Coordinates for Markers
  const [coordinates] = useState([
    { id: 1, name: "Intersection 1", lat: 37.7749, lng: -122.4194 },
    { id: 2, name: "Intersection 2", lat: 34.0522, lng: -118.2437 },
    { id: 3, name: "Intersection 3", lat: 40.7128, lng: -74.006 },
    { id: 4, name: "Intersection 4", lat: 51.5074, lng: -0.1278 },
  ]);

  const [searchStation, setSearchStation] = useState("");
  const [searchIntersection, setSearchIntersection] = useState("");
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedIntersection, setSelectedIntersection] = useState(null);

  const handleSelectStation = (station) => {
    setSelectedStation(station);
    setSelectedIntersection(null); // Reset the selected intersection when a station is selected
  };

  const handleAssign = () => {
    if (selectedStation && selectedIntersection) {
      alert(
        `Assigned ${selectedStation.name} to ${selectedIntersection.name}`
      );
      setSelectedStation(null);
      setSelectedIntersection(null);
    } else {
      alert("Please select a station and an intersection first.");
    }
  };

  const filteredStations = stations.filter((station) =>
    station.name.toLowerCase().includes(searchStation.toLowerCase())
  );

  const filteredIntersections = coordinates.filter((coord) =>
    coord.name.toLowerCase().includes(searchIntersection.toLowerCase())
  );

  return (
    <div className="p-6 mt-24 flex flex-col gap-4 p-8 bg-gray-100 min-h-screen">
      {/* Top Section - Map and Intersection Search */}
      <div className="w-full flex flex-col gap-2 bg-white rounded-md p-4 shadow-md" style={{ flex: "1 1 50%" }}>
        <h3 className="text-lg font-medium mb-2">Choose Intersection</h3>
        {/* Intersection Search */}
        <input
          type="text"
          placeholder="Search Intersection"
          className="p-3 rounded-md shadow-md w-full mb-2"
          value={searchIntersection}
          onChange={(e) => setSearchIntersection(e.target.value)}
        />
        {/* Map */}
        <div className="flex-grow">
          <MapContainer
            center={[37.7749, -122.4194]} // Default center
            zoom={3}
            style={{ height: "400px", width: "100%", borderRadius: "8px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredIntersections.map((coord) => (
              <Marker
                key={coord.id}
                position={[coord.lat, coord.lng]}
                icon={customIcon} // Use custom icon
                eventHandlers={{
                  click: () => setSelectedIntersection(coord),
                }}
              >
                <Popup>{coord.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Bottom Section - Station List and Assign Button */}
      <div className="w-full flex flex-col lg:flex-row gap-4">
        {/* Station List */}
        <div className="w-full lg:w-2/3 bg-white rounded-md p-4 shadow-md">
          <h3 className="text-lg font-medium mb-4">Select Station</h3>
          {/* Station Search */}
          <input
            type="text"
            placeholder="Search Station"
            className="p-3 rounded-md shadow-md w-full mb-4"
            value={searchStation}
            onChange={(e) => setSearchStation(e.target.value)}
          />
          {/* Station List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredStations.map((station) => (
              <div
                key={station.id}
                className={`flex justify-between items-center p-3 rounded-md mb-2 cursor-pointer ${
                  selectedStation?.id === station.id
                    ? "bg-blue-400 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => handleSelectStation(station)}
              >
                <div>
                  <span className="font-medium">{station.name}</span>
                  <span className="block text-gray-600">{station.cnic}</span>
                </div>
                <button className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Select
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Assign Button */}
        <div className="flex justify-end items-end w-full lg:w-1/3">
          <button
            onClick={handleAssign}
            className="px-6 py-2 bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-600"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignIntersection;

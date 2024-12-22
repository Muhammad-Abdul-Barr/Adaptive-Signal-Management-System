import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import Leaflet to define custom icons
import "leaflet/dist/leaflet.css";

// Path to your custom image
import customMarkerImage from "D:/Study/5th Semester/AI/Theory/trafficproject/System/src/marker.png"; 

// Define the custom icon
const customIcon = L.icon({
  iconUrl: customMarkerImage,
  iconSize: [40, 40], // Adjust the size as needed
  iconAnchor: [20, 40], // Anchor point to center the icon
  popupAnchor: [0, -40], // Adjust popup position
});

const StationConfigureIntersection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [dataArray, setDataArray] = useState([
    // Example data for debugging
    { signalName: "Signal 1", coordinates: [51.505, -0.09] },
    { signalName: "Signal 2", coordinates: [51.51, -0.1] },
  ]);

  const navigate = useNavigate(); // For navigation

  const handleSearch = () => {
    const result = dataArray.find(
      (item) => item.signalName.toLowerCase() === searchQuery.toLowerCase()
    );
    if (result) {
      setSelectedCoordinates(result.coordinates);
    } else {
      alert("No matching signal found.");
    }
  };

  const handleMarkerClick = (data) => {
    setSelectedCoordinates(data.coordinates);
  };

  const handleNavigate = () => {
    navigate("live-feeds", { state: { selectedCoordinates } }); // Replace "/next-page" with your actual route
  };

  return (
    <div className="p-6 mt-24 bg-gray-100 min-h-screen">
      <div className="mb-4">
        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Intersection Name"
            className="p-3 border rounded-lg bg-gray-200 w-full"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        <p className="mb-2 font-semibold">Choose Intersection to Moniter</p>
        <MapContainer
          center={selectedCoordinates || [51.505, -0.09]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
          className="rounded-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          {dataArray.map((data, index) => (
            <Marker
              key={index}
              position={data.coordinates}
              icon={customIcon} // Use the custom icon
              eventHandlers={{
                click: () => handleMarkerClick(data),
              }}
            >
              <Popup>{data.signalName}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <button
        onClick={handleNavigate}
        className="bg-purple-500 text-white py-2 px-6 rounded-lg hover:bg-purple-600 w-full mt-4"
      >
        Next
      </button>
    </div>
  );
};

export default StationConfigureIntersection;

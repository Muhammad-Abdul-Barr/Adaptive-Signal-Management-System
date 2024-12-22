import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import Leaflet to define custom icons
import "leaflet/dist/leaflet.css";

// Path to your custom image
import customMarkerImage from "D:/Study/5th Semester/AI/Theory/trafficproject/System/src/marker.png"; 

// Define the custom icon
const customIcon = L.icon({
  iconUrl: customMarkerImage,
  iconSize: [40, 40], // Adjust size as needed
  iconAnchor: [20, 40], // Anchor point to center the icon
  popupAnchor: [0, -40], // Adjust popup position
});

const DeleteSignal = () => {
  const [formData, setFormData] = useState({
    signalName: "Dummy Signal",
    signalLocation: "Dummy Location",
    trafficFlow: "Medium",
    numberOfSignals: "3",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [dataArray, setDataArray] = useState([
    {
      signalName: "Signal 1",
      signalLocation: "Location 1",
      trafficFlow: "High",
      numberOfSignals: 2,
      coordinates: [51.505, -0.09],
    },
    {
      signalName: "Signal 2",
      signalLocation: "Location 2",
      trafficFlow: "Low",
      numberOfSignals: 4,
      coordinates: [51.51, -0.1],
    },
    {
      signalName: "Signal 3",
      signalLocation: "Location 3",
      trafficFlow: "Medium",
      numberOfSignals: 3,
      coordinates: [51.515, -0.11],
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMarkerClick = (data) => {
    setFormData({
      signalName: data.signalName,
      signalLocation: data.signalLocation,
      trafficFlow: data.trafficFlow,
      numberOfSignals: data.numberOfSignals,
    });
    setSelectedCoordinates(data.coordinates);
  };

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

  const handleDelete = () => {
    if (selectedCoordinates) {
      setDataArray(dataArray.filter((data) => data.coordinates !== selectedCoordinates));
      setSelectedCoordinates(null);
    } else {
      alert("No signal selected to delete.");
    }
  };

  return (
    <div className="p-6 mt-24 bg-gray-100 min-h-screen">
      <div className="mb-4">
        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Signal Name"
            className="p-3 border rounded-lg bg-gray-200 w-full"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>
        <p className="mb-2 font-semibold">Choose Signal Location</p>
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
              icon={customIcon} // Apply custom icon here
              eventHandlers={{
                click: () => handleMarkerClick(data),
              }}
            >
              <Popup>{data.signalName}</Popup>
            </Marker>
          ))}
          {selectedCoordinates && (
            <Marker position={selectedCoordinates} icon={customIcon}>
              <Popup>Selected Location</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteSignal;

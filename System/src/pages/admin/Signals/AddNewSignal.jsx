import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
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

const AddNewSignal = () => {
  const [formData, setFormData] = useState({
    signalName: "",
    signalLocation: "",
    trafficFlow: "",
    numberOfSignals: "",
  });

  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [dataArray, setDataArray] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddData = () => {
    if (selectedCoordinates) {
      const newData = {
        ...formData,
        coordinates: selectedCoordinates,
      };
      setDataArray([...dataArray, newData]);
      // Reset form
      setFormData({ signalName: "", signalLocation: "", trafficFlow: "", numberOfSignals: "" });
      setSelectedCoordinates(null);
    } else {
      alert("Please select a location on the map.");
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click: (e) => {
        setSelectedCoordinates([e.latlng.lat, e.latlng.lng]);
        console.log(selectedCoordinates);
      },
    });
    return selectedCoordinates ? (
      <Marker position={selectedCoordinates} icon={customIcon} /> // Use the custom icon here
    ) : null;
  };

  return (
    <div className="p-6 mt-24 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="signalName"
          value={formData.signalName}
          onChange={handleInputChange}
          placeholder="Signal Name"
          className="p-3 border rounded-lg bg-purple-100 w-full"
        />
        <input
          type="text"
          name="signalLocation"
          value={formData.signalLocation}
          onChange={handleInputChange}
          placeholder="Signal Location"
          className="p-3 border rounded-lg bg-purple-100 w-full"
        />
        <input
          type="text"
          name="trafficFlow"
          value={formData.trafficFlow}
          onChange={handleInputChange}
          placeholder="Traffic Flow"
          className="p-3 border rounded-lg bg-purple-100 w-full"
        />
        <input
          type="number"
          name="numberOfSignals"
          value={formData.numberOfSignals}
          onChange={handleInputChange}
          placeholder="Number of Signals"
          className="p-3 border rounded-lg bg-purple-100 w-full"
        />
      </div>

      <div className="mb-4">
        <p className="mb-2 font-semibold">Choose Signal Location</p>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
          className="rounded-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          <LocationMarker />
        </MapContainer>
      </div>

      <button
        onClick={handleAddData}
        className="bg-purple-500 text-white py-2 px-6 rounded-lg hover:bg-purple-600"
      >
        Add
      </button>

      {/* Debugging Section (Optional) */}
      <pre className="mt-4 bg-gray-200 p-4 rounded-lg overflow-auto">
        {JSON.stringify(dataArray, null, 2)}
      </pre>
    </div>
  );
};

export default AddNewSignal;

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const DeleteSignal = () => {
  const [formData, setFormData] = useState({
    signalName: "",
    signalLocation: "",
    trafficFlow: "",
    numberOfSignals: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [dataArray, setDataArray] = useState([
    // Example data for debugging
    // { signalName: "Signal 1", signalLocation: "Location 1", trafficFlow: "High", numberOfSignals: 2, coordinates: [51.505, -0.09] }
  ]);

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

export default DeleteSignal;

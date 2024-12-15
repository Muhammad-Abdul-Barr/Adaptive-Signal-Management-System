import React, { useState } from "react";

const DeleteStation = () => {
  const [stations, setStations] = useState([
    { id: 1, name: "Station Name 1", cnic: "12345-6789012-3" },
    { id: 2, name: "Station Name 2", cnic: "12345-6789012-4" },
    { id: 3, name: "Station Name 3", cnic: "12345-6789012-5" },
    { id: 4, name: "Station Name 4", cnic: "12345-6789012-6" },
  ]);

  const [search, setSearch] = useState("");

  const handleDelete = (id) => {
    setStations((prevStations) => prevStations.filter((station) => station.id !== id));
  };

  const filteredStations = stations.filter((station) =>
    station.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 mt-20 flex flex-col items-start gap-8 p-8 bg-gray-100 min-h-screen">
      {/* Search Section */}
      <div className="relative w-full mb-4">
        <input
          type="text"
          placeholder="Search"
          className="p-3 pl-10 rounded-md w-full shadow-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full bg-gray-700 rounded-md p-4">
        <div className="grid grid-cols-3 gap-4 text-white font-medium p-2">
          <span>Station Name</span>
          <span>CNIC</span>
          <span>Action</span>
        </div>

        {filteredStations.map((station) => (
          <div
            key={station.id}
            className="grid grid-cols-3 gap-4 items-center bg-purple-100 p-3 rounded-md mb-2"
          >
            <span className="font-medium">{station.name}</span>
            <span className="text-gray-600">{station.cnic}</span>
            <button
              className="px-4 py-1 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
              onClick={() => handleDelete(station.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteStation;

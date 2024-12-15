import React, { useState } from "react";

const EditStation = () => {
  const [formData, setFormData] = useState([
    { id: 1, name: "Station Name 1", cnic: "12345-6789012-3", email: "", password: "" },
    { id: 2, name: "Station Name 2", cnic: "12345-6789012-4", email: "", password: "" },
    { id: 3, name: "Station Name 3", cnic: "12345-6789012-5", email: "", password: "" },
    { id: 4, name: "Station Name 4", cnic: "12345-6789012-6", email: "", password: "" },
    { id: 5, name: "Station Name 5", cnic: "12345-6789012-7", email: "", password: "" },
    { id: 6, name: "Station Name 6", cnic: "12345-6789012-8", email: "", password: "" },
    { id: 7, name: "Station Name 7", cnic: "12345-6789012-9", email: "", password: "" },
    { id: 8, name: "Station Name 8", cnic: "12345-6789012-0", email: "", password: "" },
  ]);

  const [selectedStation, setSelectedStation] = useState(null); // Station being edited
  const [search, setSearch] = useState("");

  const handleEditClick = (station) => {
    setSelectedStation({ ...station }); // Copy current station data to form
  };

  const handleUpdate = () => {
    // Update the formData array
    setFormData((prev) =>
      prev.map((item) =>
        item.id === selectedStation.id ? { ...selectedStation } : item
      )
    );
    setSelectedStation(null); // Reset form
  };

  const filteredData = formData.filter((station) =>
    station.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 mt-20 flex flex-col md:flex-row items-start gap-8 bg-gray-100 min-h-screen">
      {/* Editable Form Section */}
      <div className="flex flex-col gap-4 w-full md:w-1/3">
        <h2 className="text-lg font-bold mb-2">Edit Station</h2>
        <input
          type="text"
          placeholder="Station Name"
          className="p-3 rounded-md bg-purple-100"
          value={selectedStation?.name || ""}
          onChange={(e) =>
            setSelectedStation({ ...selectedStation, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Station Master CNIC"
          className="p-3 rounded-md bg-purple-100"
          value={selectedStation?.cnic || ""}
          onChange={(e) =>
            setSelectedStation({ ...selectedStation, cnic: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email of Station Master"
          className="p-3 rounded-md bg-purple-100"
          value={selectedStation?.email || ""}
          onChange={(e) =>
            setSelectedStation({ ...selectedStation, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 rounded-md bg-purple-100"
          value={selectedStation?.password || ""}
          onChange={(e) =>
            setSelectedStation({ ...selectedStation, password: e.target.value })
          }
        />
        <button
          onClick={handleUpdate}
          disabled={!selectedStation}
          className="p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400"
        >
          Update
        </button>
      </div>

      {/* Table Section */}
      <div className="w-full md:w-2/3">
        {/* Search Box */}
        <div className="relative mb-4">
  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
    🔍
  </div>
  <input
    type="text"
    placeholder="Search"
    className="p-3 pl-10 rounded-md w-full shadow-md"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>


        {/* Table */}
        <div className="bg-gray-700 rounded-md p-4">
          {filteredData.map((station) => (
            <div
              key={station.id}
              className="flex justify-between items-center bg-purple-100 p-3 rounded-md mb-2"
            >
              <div className="flex gap-4">
                <span className="font-medium">{station.name}</span>
                <span className="text-gray-600">{station.cnic}</span>
              </div>
              <button
                onClick={() => handleEditClick(station)}
                className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditStation;

import React, { useState } from "react";

const AddStation = () => {
  const [formData, setFormData] = useState({
    stationName: "",
    stationMasterCnic: "",
    email: "",
    password: "",
    profilePicture: "",
  });

  const [dataArray, setDataArray] = useState([
    // Example data for debugging
    // { stationName: "Station 1", stationMasterCnic: "12345", email: "example@example.com", password: "password123", profilePicture: "link-to-image" }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpload = () => {
    // Simulate image upload
    const uploadedImageLink = "https://via.placeholder.com/150"; // Placeholder image link
    setFormData({
      ...formData,
      profilePicture: uploadedImageLink,
    });
  };

  const handleAddData = () => {
    if (formData.stationName && formData.stationMasterCnic && formData.email && formData.password && formData.profilePicture) {
      setDataArray([...dataArray, formData]);
      // Reset form
      setFormData({
        stationName: "",
        stationMasterCnic: "",
        email: "",
        password: "",
        profilePicture: "",
      });
    } else {
      alert("Please fill all the fields and upload a profile picture.");
    }
  };

  return (
    <div className="p-6 mt-24 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="grid grid-cols-2 gap-4 mb-4 w-full max-w-3xl">
        <input
          type="text"
          name="stationName"
          value={formData.stationName}
          onChange={handleInputChange}
          placeholder="Station Name"
          className="p-3 border rounded-lg bg-purple-100 w-full"
        />
        <input
          type="text"
          name="stationMasterCnic"
          value={formData.stationMasterCnic}
          onChange={handleInputChange}
          placeholder="Station Master CNIC"
          className="p-3 border rounded-lg bg-purple-100 w-full"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email of Station Master"
          className="p-3 border rounded-lg bg-purple-100 w-full"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="p-3 border rounded-lg bg-purple-100 w-full"
        />
      </div>

      <div className="flex flex-col items-center mb-4">
        <div className="w-32 h-32 mb-2 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
          {formData.profilePicture ? (
            <img
              src={formData.profilePicture}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-gray-500">No Image</span>
          )}
        </div>
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Upload
        </button>
        <p className="text-sm text-gray-500 mt-2">Maximum Upload Size 500KB</p>
      </div>

      <button
        onClick={handleAddData}
        className="bg-purple-500 text-white py-2 px-6 rounded-lg hover:bg-purple-600"
      >
        Add
      </button>

      {/* Debugging Section (Optional) */}
      <pre className="mt-4 bg-gray-200 p-4 rounded-lg overflow-auto w-full max-w-3xl">
        {JSON.stringify(dataArray, null, 2)}
      </pre>
    </div>
  );
};

export default AddStation;

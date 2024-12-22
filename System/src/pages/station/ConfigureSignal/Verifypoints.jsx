import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const VerifyCamera = () => {
  const location = useLocation();
  const inputData = location.state || [];
  const [image, setImage] = useState(null);
  const [vehicleCounts, setVehicleCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const { imagesWithPoints } = location.state || { imagesWithPoints: [] };

  // Track if the request has already been sent
  const requestSent = useRef(false);

  // Base URL for the assets directory
  const ASSETS_BASE_URL = "/assets/";

  useEffect(() => {
    console.log("Received points:", JSON.stringify(imagesWithPoints, null, 2));
  }, [imagesWithPoints]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!requestSent.current) {
          requestSent.current = true; // Mark the request as sent
          const response = await axios.post("http://localhost:8000/process-images", inputData);

          // Assume backend sends an object with image name and vehicle counts
          const { combined_image, vehicle_counts } = response.data;
          console.log(response.data);
          setImage(`${ASSETS_BASE_URL}${combined_image}`);
          setVehicleCounts(vehicle_counts);
        }
      } catch (error) {
        console.error("Error fetching data from backend:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [inputData]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-xl font-semibold mb-6 text-center">Configured Points (Please verify)</h1>

      {loading ? (
        <div className="text-lg font-medium">Loading...</div>
      ) : (
        <div className="flex flex-col items-center">
          {image && (
            <img
              src={image}
              alt="Vehicle detection"
              className="w-full max-w-2xl rounded-md mb-4 shadow-lg"
            />
          )}

          <div className="border rounded-md p-4 bg-white shadow-md w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-2">Vehicle Counts:</h2>
            {Object.entries(vehicleCounts).length > 0 ? (
              Object.entries(vehicleCounts).map(([vehicleType, count], idx) => {
                if (typeof count === "object") {
                  return (
                    <div key={idx}>
                      <p className="text-sm font-medium">{vehicleType}:</p>
                      {Object.entries(count).map(([subType, subCount], subIdx) => (
                        <p key={subIdx} className="text-sm">
                          {subType}: {subCount}
                        </p>
                      ))}
                    </div>
                  );
                } else {
                  return (
                    <p key={idx} className="text-sm">
                      {vehicleType}: {count}
                    </p>
                  );
                }
              })
            ) : (
              <p className="text-sm">No vehicle data available.</p>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between w-full max-w-2xl mt-6">
        <button
          className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600"
          onClick={() => console.log("Reselect action")}
        >
          Reselect
        </button>
        <button
          className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600"
          onClick={() => console.log("Configure action")}
        >
          Configure
        </button>
      </div>
    </div>
  );
};

export default VerifyCamera;

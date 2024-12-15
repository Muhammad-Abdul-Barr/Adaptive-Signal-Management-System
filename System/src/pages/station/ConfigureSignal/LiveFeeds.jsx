import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

const LiveFeed = () => {
  const [cameraFeeds] = useState([
    "http://<IP1>:<port>/video", // Replace with Mobile 1 stream URL
    "http://<IP2>:<port>/video", // Replace with Mobile 2 stream URL
    "http://<IP3>:<port>/video", // Replace with Mobile 3 stream URL
    "http://<IP4>:<port>/video", // Replace with Mobile 4 stream URL
  ]);

  const feedRefs = useRef([]);
  const navigate = useNavigate();

  const handleConfigure = async () => {
    const capturedScreenshots = [];

    for (let i = 0; i < feedRefs.current.length; i++) {
      const iframeElement = feedRefs.current[i];
      if (iframeElement) {
        try {
          const canvas = await html2canvas(iframeElement.parentElement); // Capture parent container
          const dataUrl = canvas.toDataURL("image/png");
          capturedScreenshots.push(dataUrl); // Push Base64 string
        } catch (error) {
          console.error("Failed to capture screenshot:", error);
        }
      }
    }

    // Navigate to the next page with screenshots
    navigate("/set-areay", { state: { screenshots: capturedScreenshots } });
  };
  const handlebacknavigate = () => {
    navigate("/station/configure-intersection"); 
  };
  const handleOverridenavigate = () => {
    navigate("/station/override"); 
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {cameraFeeds.map((feed, index) => (
            <div key={index} className="flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Signal {index + 1}
              </h3>
              <div className="w-72 h-48 border rounded-lg">
                <iframe
                  ref={(el) => (feedRefs.current[index] = el)}
                  src={feed}
                  title={`Camera ${index + 1}`}
                  className="w-full h-full rounded-lg"
                  allow="autoplay; encrypted-media"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
          onClick={handlebacknavigate}
        >
          Reselect
        </button>
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
          onClick={handleOverridenavigate}
        >
          Override
        </button>
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
          onClick={handleConfigure}
        >
          Configure
        </button>
      </div>
    </div>
  );
};

export default LiveFeed;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LiveFeed = () => {
  const [cameraFeeds] = useState([
    "http://192.168.10.22:8080/video", // Video stream URL
    "http://192.168.10.22:8080/video", // Video stream URL
    "http://ip-address:port/video", // Video stream URL
    "http://ip-address:port/video", // Video stream URL
  ]);

  const [snapshotUrls] = useState([
    "http://localhost:8080/snapshot?url=http://192.168.10.22:8080/photo.jpg", // Proxy snapshot endpoint
    "http://localhost:8080/snapshot?url=http://192.168.10.22:8080/photo.jpg", // Proxy snapshot endpoint
    "http://localhost:8080/snapshot?url=http://ip-address:port/photo.jpg", // Proxy snapshot endpoint
    "http://localhost:8080/snapshot?url=http://ip-address:port/photo.jpg", // Proxy snapshot endpoint
  ]);

  const [feedStatus, setFeedStatus] = useState([]); // To track feed availability
  const navigate = useNavigate();

  // Pre-check for feed availability
  useEffect(() => {
    const checkFeeds = async () => {
      const status = await Promise.all(
        cameraFeeds.map(async (url) => {
          try {
            const response = await fetch(url, { method: "HEAD" });
            return response.ok;
          } catch {
            return false;
          }
        })
      );
      setFeedStatus(status);
    };

    checkFeeds();
  }, [cameraFeeds]);

  const generateUniqueName = () => {
    const timestamp = Date.now();
    const randomValue = Math.random().toString(36).substring(2, 8); // Generate a random string
    return `snapshot_${timestamp}_${randomValue}.jpg`;
  };

  const handleConfigure = async () => {
    const capturedScreenshots = [];
    const imageNames = [];
  
    for (let i = 0; i < snapshotUrls.length; i++) {
      if (feedStatus[i]) {
        try {
          console.log(`Capturing snapshot for feed ${i + 1}`);
          const response = await fetch(snapshotUrls[i]);
          const blob = await response.blob();
  
          // Create a local URL for the blob
          const dataUrl = URL.createObjectURL(blob);
          capturedScreenshots.push(dataUrl);
  
          // Generate a unique name for each snapshot
          const uniqueName = generateUniqueName();
          imageNames.push(uniqueName);
  
          // Trigger download
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = uniqueName; // Use the unique name
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
  
          console.log(`Snapshot captured and downloaded for feed ${i + 1}`);
        } catch (error) {
          console.error(`Failed to capture snapshot for feed ${i + 1}:`, error);
        }
      } else {
        console.warn(`Feed ${i + 1} is unavailable. Skipping.`);
      }
    }
  
    // Add a delay before navigating to the next page
    console.log("Image path", imageNames);
    setTimeout(() => {
      navigate("set-area", { state: { imageNames } });
    }, 1000); // Delay of 2 seconds (2000 ms)
  };
  
  
  const handlebacknavigate = () => {
    navigate("/station/configure-intersection");
  };

  const handleOverridenavigate = () => {
    navigate("/station/override");
  };

  const allSignalsDown = feedStatus.every((status) => !status);

  return (
    <div className="mt-24 min-h-screen bg-gray-100 flex flex-col items-center overflow-hidden">
      {/* Live Feed Grid */}
      <div className="grid grid-cols-2 gap-2 mb-6 w-full max-w-10xl h-[calc(180vh-20rem)] overflow-hidden">
        {cameraFeeds.map((feed, index) => (
          <div key={index} className="flex flex-col items-center w-full h-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Signal {index + 1}
            </h3>
            <div className="w-full h-full border rounded-lg relative bg-gray-200 flex items-center justify-center">
              {feedStatus[index] ? (
                <iframe
                  src={feed}
                  title={`Camera ${index + 1}`}
                  className="w-full h-full rounded-lg"
                  style={{ objectFit: "cover" }}
                  allow="autoplay; encrypted-media"
                ></iframe>
              ) : (
                <span className="text-red-500 font-bold">NO SIGNAL</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Intersection Details */}
      <div className="bg-gray-200 p-6 rounded-lg shadow-md w-full max-w-3xl mb-6">
        <h2 className="text-xl font-bold mb-4">Intersection Details</h2>
        <div className="space-y-2">
          <p className="bg-gray-300 p-2 rounded-lg">
            <strong>Name:</strong> Garhi Shaho Station
          </p>
          <p className="bg-gray-300 p-2 rounded-lg">
            <strong>Location:</strong> Garhi Shaho
          </p>
          <p className="bg-gray-300 p-2 rounded-lg">
            <strong>Traffic Flow:</strong> Four Way
          </p>
          <p className="bg-gray-300 p-2 rounded-lg">
            <strong>Number of Signals:</strong> 4
          </p>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-col space-y-3">
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
          onClick={handlebacknavigate}
        >
          Reselect
        </button>
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
          onClick={handleOverridenavigate}
        >
          Override
        </button>
        <button
          className={`py-2 px-6 rounded-lg shadow-md font-semibold ${
            allSignalsDown
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-600 text-white"
          }`}
          onClick={handleConfigure}
          disabled={allSignalsDown}
        >
          Configure
        </button>
      </div>

      {/* Warning if all feeds are down */}
      {allSignalsDown && (
        <p className="mt-4 text-red-600 font-bold">
          All signals are unavailable. Cannot proceed to configure.
        </p>
      )}
    </div>
  );
};

export default LiveFeed;

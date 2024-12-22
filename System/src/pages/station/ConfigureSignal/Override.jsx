import React, { useState, useEffect } from "react";

const OverridePage = () => {
  const [cameraFeeds] = useState([
    "http://<IP1>:<port>/video", // Replace with Camera 1 stream URL
    "http://<IP2>:<port>/video", // Replace with Camera 2 stream URL
    "http://<IP3>:<port>/video", // Replace with Camera 3 stream URL
    "http://<IP4>:<port>/video", // Replace with Camera 4 stream URL
  ]);

  const [feedStatus, setFeedStatus] = useState([]); // To store signal availability
  const [customTimings, setCustomTimings] = useState({
    signal1: 20,
    signal2: 15,
    signal3: 35,
    signal4: 10,
  });
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [database, setDatabase] = useState(null); // To simulate the updated database
  const [allSignalsDown, setAllSignalsDown] = useState(false);

  const presets = [
    { label: "15 Second for Each Signal", timings: [15, 15, 15, 15] },
    { label: "Sg1: 10s, Sg2: 15s, Sg3: 20s, Sg4: 25s", timings: [10, 15, 20, 25] },
    { label: "30 Second for Each Signal", timings: [30, 30, 30, 30] },
    { label: "Sg1: 10s, Sg2: 25s, Sg3: 20s, Sg4: 15s", timings: [10, 25, 20, 15] },
  ];

  // Precheck signal availability
  useEffect(() => {
    const checkFeeds = async () => {
      const status = await Promise.all(
        cameraFeeds.map(async (url) => {
          return await checkFeedAvailability(url);
        })
      );
      setFeedStatus(status);
      setAllSignalsDown(status.every((feed) => feed === false));
    };

    checkFeeds();
  }, [cameraFeeds]);

  const checkFeedAvailability = async (url) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.ok; // Feed is available
    } catch {
      return false; // Feed is unavailable
    }
  };

  const handleCustomChange = (e, signal) => {
    setCustomTimings({ ...customTimings, [signal]: e.target.value });
  };

  const handlePresetSelect = (preset) => {
    setCustomTimings({
      signal1: preset[0],
      signal2: preset[1],
      signal3: preset[2],
      signal4: preset[3],
    });
    setSelectedPreset(preset);
  };

  const handleOverride = () => {
    if (allSignalsDown) return; // Prevent override when all signals are down

    const updatedDatabase = {
      signal1: customTimings.signal1,
      signal2: customTimings.signal2,
      signal3: customTimings.signal3,
      signal4: customTimings.signal4,
    };

    setDatabase(updatedDatabase); // Simulating a database update
    console.log("Database updated:", updatedDatabase);
    alert("Override successful! Database has been updated.");
  };

  return (
    <div className="p-6 mt-24 min-h-screen bg-gray-200">
      <h3 className="text-2xl font-bold text-center mb-4">Override Page</h3>

      {/* Live Camera Feeds */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {cameraFeeds.map((feed, index) => (
          <div key={index} className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-2">Signal {index + 1}</h3>
            <div className="w-72 h-48 border rounded-lg flex items-center justify-center bg-gray-300">
              {feedStatus[index] ? (
                <iframe
                  src={feed}
                  title={`Camera ${index + 1}`}
                  className="w-full h-full rounded-lg"
                  allow="autoplay; encrypted-media"
                ></iframe>
              ) : (
                <span className="text-red-500 font-bold">NO SIGNAL</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Custom Timings and Presets */}
      <div className="grid grid-cols-2 gap-8">
        {/* Custom Timings */}
        <div className={`p-6 rounded-lg shadow-md ${allSignalsDown ? "bg-gray-400 opacity-50" : "bg-gray-400"}`}>
          <h2 className="text-lg font-bold mb-4">Custom Timings</h2>
          {["signal1", "signal2", "signal3", "signal4"].map((signal, index) => (
            <div
              key={signal}
              className="flex items-center justify-between mb-3 p-2 bg-gray-300 rounded"
            >
              <input
                type="number"
                value={customTimings[signal]}
                onChange={(e) => handleCustomChange(e, signal)}
                className="w-16 p-1 rounded-lg text-center"
                disabled={allSignalsDown}
              />
              <span className="font-semibold text-gray-700">
                Signal {index + 1} Timing
              </span>
            </div>
          ))}
        </div>

        {/* Presets */}
        <div className={`p-6 rounded-lg shadow-md ${allSignalsDown ? "bg-gray-400 opacity-50" : "bg-gray-400"}`}>
          <h2 className="text-lg font-bold mb-4">Presets</h2>
          {presets.map((preset, index) => (
            <div
              key={index}
              className={`flex justify-between items-center mb-3 p-2 rounded ${
                selectedPreset === preset.timings ? "bg-purple-200" : "bg-gray-300"
              }`}
            >
              <span className="text-gray-800">{preset.label}</span>
              <button
                onClick={() => handlePresetSelect(preset.timings)}
                className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
                disabled={allSignalsDown}
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Override Button */}
      <div className="flex justify-end mt-6">
        <button
          className={`px-6 py-2 rounded-lg font-semibold ${
            allSignalsDown
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
          onClick={handleOverride}
          disabled={allSignalsDown}
        >
          Override
        </button>
      </div>

      {/* Warning Message */}
      {allSignalsDown && (
        <p className="mt-4 text-red-600 font-bold text-center">
          All signals are unavailable. Cannot override or set presets.
        </p>
      )}
    </div>
  );
};

export default OverridePage;

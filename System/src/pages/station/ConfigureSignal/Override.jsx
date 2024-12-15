import React, { useState } from "react";

const OverridePage = () => {
  const [cameraFeeds] = useState([
    "http://<IP1>:<port>/video", // Replace with Camera 1 stream URL
    "http://<IP2>:<port>/video", // Replace with Camera 2 stream URL
    "http://<IP3>:<port>/video", // Replace with Camera 3 stream URL
    "http://<IP4>:<port>/video", // Replace with Camera 4 stream URL
  ]);

  const [customTimings, setCustomTimings] = useState({
    signal1: 20,
    signal2: 15,
    signal3: 35,
    signal4: 10,
  });

  const [selectedPreset, setSelectedPreset] = useState(null);

  const presets = [
    { label: "15 Second for Each Signal", timings: [15, 15, 15, 15] },
    { label: "Sg1: 10s, Sg2: 15s, Sg3: 20s, Sg4: 25s", timings: [10, 15, 20, 25] },
    { label: "30 Second for Each Signal", timings: [30, 30, 30, 30] },
    { label: "Sg1: 10s, Sg2: 25s, Sg3: 20s, Sg4: 15s", timings: [10, 25, 20, 15] },
  ];

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

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Override Page</h1>

      {/* Live Camera Feeds */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {cameraFeeds.map((feed, index) => (
          <div key={index} className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-2">Signal {index + 1}</h3>
            <iframe
              src={feed}
              title={`Camera ${index + 1}`}
              className="w-72 h-48 border rounded-lg"
              allow="autoplay; encrypted-media"
            ></iframe>
          </div>
        ))}
      </div>

      {/* Custom Timings and Presets */}
      <div className="grid grid-cols-2 gap-8">
        {/* Custom Timings */}
        <div className="bg-gray-400 p-6 rounded-lg shadow-md">
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
              />
              <span className="font-semibold text-gray-700">
                Signal {index + 1} Timing
              </span>
            </div>
          ))}
        </div>

        {/* Presets */}
        <div className="bg-gray-400 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Presets</h2>
          {presets.map((preset, index) => (
            <div
              key={index}
              className={`flex justify-between items-center mb-3 p-2 rounded ${
                selectedPreset === preset.timings
                  ? "bg-purple-200"
                  : "bg-gray-300"
              }`}
            >
              <span className="text-gray-800">{preset.label}</span>
              <button
                onClick={() => handlePresetSelect(preset.timings)}
                className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Override Button */}
      <div className="flex justify-end mt-6">
        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
          Override
        </button>
      </div>
    </div>
  );
};

export default OverridePage;

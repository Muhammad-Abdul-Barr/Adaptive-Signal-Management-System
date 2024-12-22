import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const WatchSignal = () => {
  const [cameraFeeds] = useState([
    "http://192.168.100.92:8080/video", // Signal 1
    "http://192.168.100.92:8080/video", // Signal 2
    "http://ip-address:port/video", // Signal 3
    "http://ip-address:port/video", // Signal 4
  ]);

  const [snapshotUrls] = useState([
    "http://localhost:8080/snapshot?url=http://192.168.100.92:8080/photo.jpg", // Signal 1
    "http://localhost:8080/snapshot?url=http://192.168.100.92:8080/photo.jpg", // Signal 2
    "http://localhost:8080/snapshot?url=http://ip-address:port/photo.jpg", // Signal 3
    "http://localhost:8080/snapshot?url=http://ip-address:port/photo.jpg", // Signal 4
  ]);

  const [feedStatus, setFeedStatus] = useState([]);
  const [signalLogs, setSignalLogs] = useState([]);
  const [signalTimings, setSignalTimings] = useState([30, 30, 30, 30]);
  const [currentSignal, setCurrentSignal] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const feedRefs = useRef([]);

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

  useEffect(() => {
    const timer = setInterval(() => {
      if (signalTimings[currentSignal] <= 5 && !isProcessing) {
        processNextSignal();
      }
      decrementSignalTimings();
    }, 1000);

    return () => clearInterval(timer);
  }, [signalTimings, currentSignal, isProcessing]);

  const decrementSignalTimings = () => {
    setSignalTimings((prev) =>
      prev.map((time, index) =>
        index === currentSignal ? Math.max(time - 1, 0) : time
      )
    );
  };

  const processNextSignal = async () => {
    setIsProcessing(true);
    try {
      // Capture screenshot and send to backend
      const screenshotName = await captureAndSendScreenshot();
      const vehicleCount = await getVehicleCountFromBackend(screenshotName);
      const newTime = calculateSignalTime(vehicleCount);

      // Update logs and signal timings
      addLog(`Signal ${currentSignal + 1} turned red.`);
      setSignalTimings((prev) =>
        prev.map((time, index) => (index === currentSignal ? newTime : time))
      );

      moveToNextSignal(newTime);
    } catch (error) {
      console.error("Error processing signal:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const captureAndSendScreenshot = async () => {
    const snapshotUrl = snapshotUrls[currentSignal];
    const uniqueName = generateUniqueName();

    try {
      const response = await fetch(snapshotUrl);
      const blob = await response.blob();

      // Generate a local URL for the blob
      const dataUrl = URL.createObjectURL(blob);

      // Trigger download to save the image locally
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = uniqueName; // Use the unique name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return uniqueName; // Only returning the image name
    } catch (error) {
      console.error("Error capturing and saving screenshot:", error);
      throw error;
    }
  };

  const getVehicleCountFromBackend = async (imageName) => {
    try {
      const response = await axios.post("http://localhost:8000/process-image", {
        imageName,
      });
      return response.data.vehicle_counts || 0;
    } catch (error) {
      console.error("Error getting vehicle count from backend:", error);
      throw error;
    }
  };

  const calculateSignalTime = (vehicleCount) => {
    // Basic logic: 5 seconds per vehicle, minimum 15 seconds
    return Math.max(vehicleCount * 5, 15);
  };

  const addLog = (message) => {
    const newLog = {
      date: new Date().toLocaleString(),
      activity: message,
      location: "Garhi Shahu Chowk Signal",
    };
    setSignalLogs((prevLogs) => [...prevLogs, newLog]);
  };

  const moveToNextSignal = (newTime) => {
    addLog(`Signal ${currentSignal + 1} set green for ${newTime} seconds.`);
    setCurrentSignal((prevSignal) => (prevSignal + 1) % 4);
  };

  const generateUniqueName = () => {
    const timestamp = Date.now();
    const randomValue = Math.random().toString(36).substring(2, 8);
    return `snapshot_${timestamp}_${randomValue}.jpg`;
  };

  return (
    <div className="p-6 mt-24 min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Live Feed Grid */}
      <div className="grid grid-cols-2 gap-6 mb-6 w-full max-w-6xl">
        {cameraFeeds.map((feed, index) => (
          <div key={index} className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-2">Signal {index + 1}</h3>
            <div className="w-full h-48 border rounded-lg relative bg-gray-200 flex items-center justify-center">
              {feedStatus[index] ? (
                <iframe
                  ref={(el) => (feedRefs.current[index] = el)}
                  src={feed}
                  title={`Signal ${index + 1}`}
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

      {/* Logs */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">Signal Logs</h2>
        <div className="overflow-auto max-h-64">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Date and Time</th>
                <th className="text-left p-2">Activity</th>
                <th className="text-left p-2">Location</th>
              </tr>
            </thead>
            <tbody>
              {signalLogs.map((log, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{log.date}</td>
                  <td className="p-2">{log.activity}</td>
                  <td className="p-2">{log.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WatchSignal;

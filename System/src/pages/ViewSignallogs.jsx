import React, { useState } from "react";

// Example data: Locations and Logs
const locations = [
  "Garhi Shahu Chowk Signal",
  "Hamdard Chowk Signal",
];

const logs = [
  {
    id: 1,
    date: "Sat 17 June, 21",
    time: "12:23 PM",
    activity: "Signal 1 turned green for 25 Seconds",
    location: "Garhi Shahu Chowk Signal",
  },
  {
    id: 2,
    date: "Sat 17 June, 21",
    time: "12:30 PM",
    activity: "Signal 2 turned green for 15 Seconds",
    location: "Garhi Shahu Chowk Signal",
  },
  {
    id: 3,
    date: "Sat 17 June, 21",
    time: "12:31 PM",
    activity: "Signal 4 turned green for 25 Seconds",
    location: "Hamdard Chowk Signal",
  },
  // Add more log entries here
];

const ITEMS_PER_PAGE = 5;

const SignalLogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter logs based on search and selected location
  const filteredLogs = logs.filter((log) => {
    return (
      (!selectedLocation || log.location === selectedLocation) &&
      (!searchTerm || log.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Paginate Logs
  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="p-6 mt-24 bg-gray-50 min-h-screen">
      {/* Search and Filters */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-2/3 p-2 rounded-lg border border-gray-300 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2">
          {/* Location Filter */}
          <select
            className="p-2 rounded-lg border border-gray-300 focus:outline-none"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">Location</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
          {/* Date Filter (Placeholder) */}
          <select
            className="p-2 rounded-lg border border-gray-300 focus:outline-none"
            disabled
          >
            <option>Date</option>
          </select>
        </div>
      </div>

      {/* Table Logs */}
      <table className="w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="text-left text-gray-600">
            <th className="p-4">Date and Time</th>
            <th className="p-4">Activity</th>
            <th className="p-4">Location</th>
            <th className="p-4">Snaps</th>
          </tr>
        </thead>
        <tbody>
          {paginatedLogs.map((log) => (
            <tr key={log.id} className="border-t hover:bg-gray-50">
              <td className="p-4">
                {log.date}
                <div className="text-sm text-gray-400">{log.time}</div>
              </td>
              <td className="p-4 font-semibold">{log.activity}</td>
              <td className="p-4">{log.location}</td>
              <td className="p-4">
                <button className="text-purple-600 hover:underline">View Snap</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-gray-600 text-sm">
          Showing {startIndex + 1} - {Math.min(startIndex + ITEMS_PER_PAGE, filteredLogs.length)} of {" "}
          {filteredLogs.length}
        </p>
        <div className="flex gap-2">
          <button
            className={`p-2 rounded-lg border ${
              currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700"
            }`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <button
            className={`p-2 rounded-lg border ${
              currentPage === totalPages || totalPages === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700"
            }`}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignalLogsPage;

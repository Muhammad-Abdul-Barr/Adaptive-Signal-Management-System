import React from "react";
import { useNavigate } from "react-router-dom";

const AdminConfigureSignals = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 mt-24"> {/* Adding padding and top margin to ensure it's below the header */}
      {/* Configure Signals Buttons */}
      <div className="flex justify-center items-center gap-10">
        <button
          onClick={() => navigate("add-signal")}
          className="flex flex-col justify-center items-center bg-blue-500 text-white w-40 h-40 rounded-lg shadow-lg hover:bg-blue-600"
        >
          <span className="text-4xl">🖼</span>
          <span className="text-lg font-bold mt-2">Add Signal</span>
        </button>
        <button
          onClick={() => navigate("update-signal")}
          className="flex flex-col justify-center items-center bg-blue-500 text-white w-40 h-40 rounded-lg shadow-lg hover:bg-blue-600"
        >
          <span className="text-4xl">🖼</span>
          <span className="text-lg font-bold mt-2">Update Signal</span>
        </button>
        <button
          onClick={() => navigate("delete-signal")}
          className="flex flex-col justify-center items-center bg-blue-500 text-white w-40 h-40 rounded-lg shadow-lg hover:bg-blue-600"
        >
          <span className="text-4xl">🖼</span>
          <span className="text-lg font-bold mt-2">Delete Signal</span>
        </button>
      </div>
    </div>
  );
};

export default AdminConfigureSignals;

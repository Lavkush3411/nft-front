import React from "react";

function SmallLoader() {
  return (
    <div className="inline-block justify-center items-center">
      <div
        className="spinner-border animate-spin inline-block w-4 h-4 border-4 border-t-transparent border-gray-200 rounded-full"
        role="status"
      ></div>
    </div>
  );
}

export default SmallLoader;

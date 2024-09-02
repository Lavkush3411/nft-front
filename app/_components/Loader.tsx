import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-gray-500 border-opacity-100"></div>
    </div>
  );
}

export default Loader;

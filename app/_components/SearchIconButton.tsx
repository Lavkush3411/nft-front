import React from "react";

function SearchIconButton() {
  return (
    <div>
      <button
        type="button"
        className="p-2 text-gray-400 hover:text-gray-500"
        aria-label="Search"
      >
        <svg
          className="w-5 h-5 cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
}

export default SearchIconButton;

"use client";
import React, { useState } from "react";
import SearchIconButton from "./SearchIconButton";

function SearchBar({
  placeholder,
  className,
}: {
  placeholder?: string;
  className?: string;
}) {
  const [search, setSearch] = useState("");
  return (
    <div>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full p-2 pr-10 border text-white border-gray-600 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 z-10 cursor-pointer">
          <SearchIconButton search={search} />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
